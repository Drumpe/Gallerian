using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Gallerian.Server.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace Gallerian.Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly UserManager<User> _userManager;
    private readonly SignInManager<User> _signInManager;
    private readonly IConfiguration _config;

    public AuthController(
        UserManager<User> userManager,
        SignInManager<User> signInManager,
        IConfiguration config)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _config = config;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterDto dto)
    {
        // Check if email already exists
        var exists = await _userManager.FindByEmailAsync(dto.Email);
        if (exists != null) return BadRequest("Email already exists.");

        var user = new User
        {
            UserName = string.IsNullOrWhiteSpace(dto.Username) ? dto.Email : dto.Username,
            Email = dto.Email,
            CreatedAt = DateTime.UtcNow,
            LastLogin = DateTime.UtcNow
        };

        // UserManager will hash the password
        var result = await _userManager.CreateAsync(user, dto.Password);
        if (!result.Succeeded) return BadRequest(result.Errors);

        // Optional: add a default role later if you enable roles
        // await _userManager.AddToRoleAsync(user, "User");

        return Ok(new { message = "Registered" });
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginDto dto)
    {
        var user = await _userManager.FindByEmailAsync(dto.Email);
        if (user == null) return Unauthorized();

        var check = await _signInManager.CheckPasswordSignInAsync(user, dto.Password, lockoutOnFailure: false);
        if (!check.Succeeded) return Unauthorized();

        user.LastLogin = DateTime.UtcNow;
        await _userManager.UpdateAsync(user);

        var token = await GenerateJwt(user);
        return Ok(new { token });
    }

    [Authorize]
    [HttpGet("me")]
    public IActionResult Me()
    {
        return Ok(new
        {
            id = User.FindFirstValue(ClaimTypes.NameIdentifier),
            email = User.FindFirstValue(ClaimTypes.Email),
            name = User.Identity?.Name
        });
    }

    private async Task<string> GenerateJwt(User user)
    {
        var jwt = _config.GetSection("Jwt");
        var claims = new List<Claim>
        {
            new(ClaimTypes.NameIdentifier, user.Id),
            new(ClaimTypes.Email, user.Email ?? string.Empty),
            new(ClaimTypes.Name, user.UserName ?? string.Empty)
        };

        // If you add roles later:
        // var roles = await _userManager.GetRolesAsync(user);
        // claims.AddRange(roles.Select(r => new Claim(ClaimTypes.Role, r)));

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwt["Key"]!));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: jwt["Issuer"],
            audience: jwt["Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(double.Parse(jwt["ExpiresMinutes"] ?? "60")),
            signingCredentials: creds
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}

public record RegisterDto(string Email, string Username, string Password);
public record LoginDto(string Email, string Password);
