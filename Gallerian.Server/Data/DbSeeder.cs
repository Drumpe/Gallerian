using Gallerian.Server.Models;
using Microsoft.AspNetCore.Identity;

namespace Gallerian.Server.Data
{
    public static class DbSeeder
    {
        public static async Task SeedAsync(UserManager<User> userManager, RoleManager<IdentityRole> roleManager)
        {
            // 1. Seed roles
            string[] roles = { "Admin", "User", "MinorUser" };

            foreach (var role in roles)
            {
                if (!await roleManager.RoleExistsAsync(role))
                {
                    await roleManager.CreateAsync(new IdentityRole(role));
                }
            }

            // 2. Seed admin user
            var adminEmail = "admin@gallerian.com";
            var adminUser = await userManager.FindByEmailAsync(adminEmail);

            if (adminUser == null)
            {
                adminUser = new User
                {
                    UserName = "admin",
                    Email = adminEmail,
                    EmailConfirmed = true,
                    CreatedAt = DateTime.UtcNow,
                    Birth = new DateTime(1990, 1, 1) 
                };

                var result = await userManager.CreateAsync(adminUser, "Admin@123"); 

                if (result.Succeeded)
                {
                    await userManager.AddToRoleAsync(adminUser, "Admin");
                }
            }
        }
    }
}
