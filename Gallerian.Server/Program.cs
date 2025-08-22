
using Gallerian.Server.Data;
using Gallerian.Server.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.OpenApi.Models;
using Microsoft.Extensions.FileProviders;





namespace Gallerian.Server
{
	public class Program
	{
		public static async Task Main(string[] args)
		{
			var builder = WebApplication.CreateBuilder(args);
			builder.Services.AddDbContext<GallerianContext>(options =>
				options.UseSqlServer(builder.Configuration.GetConnectionString("GallerianContext") ?? throw new InvalidOperationException("Connection string 'GallerianContext' not found.")));

			builder.Services.AddControllers();
			// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
			// builder.Services.AddOpenApi();
			builder.Services.AddEndpointsApiExplorer();
			builder.Services.AddSwaggerGen(c =>
			{
				c.SwaggerDoc("v1", new OpenApiInfo { Title = "Gallerian API", Version = "v1" });
				c.CustomSchemaIds(t => t.FullName);
				var jwtSecurityScheme = new OpenApiSecurityScheme
				{
					Scheme = "bearer",
					BearerFormat = "JWT",
					Name = "Authorization",
					In = ParameterLocation.Header,
					Type = SecuritySchemeType.Http,
					Description = "Enter: Bearer {token}",
					Reference = new OpenApiReference
					{
						Type = ReferenceType.SecurityScheme,
						Id = "Bearer"
					}
				};

				c.AddSecurityDefinition(jwtSecurityScheme.Reference.Id, jwtSecurityScheme);
				c.AddSecurityRequirement(new OpenApiSecurityRequirement
	{
		{ jwtSecurityScheme, Array.Empty<string>() }
	});
			});

			builder.Services.AddCors(options =>
			{
				options.AddPolicy("AllowAll", policy =>
				{
					policy.AllowAnyOrigin()
						  .AllowAnyMethod()
						  .AllowAnyHeader();
				});
			});


			// NEW: Authentication + Authorization (JWT)
			var jwt = builder.Configuration.GetSection("Jwt");

			builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
				.AddJwtBearer(o =>
				{
					o.TokenValidationParameters = new TokenValidationParameters
					{
						ValidateIssuerSigningKey = true,
						IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwt["Key"]!)),
						ValidateIssuer = true,
						ValidateAudience = true,
						ValidIssuer = jwt["Issuer"],
						ValidAudience = jwt["Audience"],
						ClockSkew = TimeSpan.Zero
					};
				});

			builder.Services.AddAuthorization();

			// Identity services (required for UserManager/SignInManager)
			builder.Services.AddIdentityCore<User>(options =>
			{
				options.Password.RequiredLength = 6;
				options.Password.RequireNonAlphanumeric = false;
				options.Password.RequireUppercase = false;
			})
			.AddRoles<IdentityRole>()
			.AddEntityFrameworkStores<GallerianContext>()
			.AddSignInManager<SignInManager<User>>();


			var app = builder.Build();

			using (var scope = app.Services.CreateScope())
			{
				var services = scope.ServiceProvider;
				var userManager = services.GetRequiredService<UserManager<User>>();
				var roleManager = services.GetRequiredService<RoleManager<IdentityRole>>();

				await DbSeeder.SeedAsync(userManager, roleManager);
			}


			app.UseDefaultFiles();
			app.MapStaticAssets();

			// Configure the HTTP request pipeline.
			if (app.Environment.IsDevelopment())
			{
				app.UseSwagger();
				app.UseSwaggerUI(c =>
				{
					c.SwaggerEndpoint("/swagger/v1/swagger.json", "Gallerian API v1");
					c.RoutePrefix = "swagger";
				});
				app.UseDeveloperExceptionPage();
			}


			app.UseCors("AllowAll");

			app.UseAuthentication();
			app.UseAuthorization();

			app.UseHttpsRedirection();

            //  Serve static files from wwwroot
            app.UseStaticFiles();

            //  Explicitly serve uploads folder
            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(
                    Path.Combine(builder.Environment.ContentRootPath, "wwwroot", "uploads")
                ),
                RequestPath = "/uploads"
            });


            app.UseAuthentication();
			app.UseAuthorization();


			app.MapControllers();

			app.MapFallbackToFile("/index.html");

			app.Run();
		}
	}
}
