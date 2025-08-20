using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Gallerian.Server.Data;
using Gallerian.Server.Models;
using Microsoft.AspNetCore.Authorization;   
using Microsoft.AspNetCore.Identity;        
using System.Security.Claims;
using Gallerian.Server.Models.Dtos;

namespace Gallerian.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly GallerianContext _context;
        private readonly PasswordHasher<User> _hasher = new();
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        public record UpdateUserDto(string? Username, DateTime? Birth);

        private string? CurrentUserId() =>
            User.FindFirstValue(ClaimTypes.NameIdentifier);

        private bool IsAdmin() =>
            User.IsInRole("Admin");

        public UsersController(GallerianContext context, UserManager<User> userManager, SignInManager<User> signInManager)
        {
            _context = context;
            _userManager = userManager;
            _signInManager = signInManager;
        }


        [Authorize(Roles = "Admin")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserDto>>> GetUsers()
        {
            var users = await _context.Users
                .Include(u => u.Comments)
                .Include(u => u.Likes)
                .Include(u => u.SocialMedias)
                .Include(u => u.ArtWorks)
                .ToListAsync();

            var result = new List<UserDto>(users.Count);
            foreach (var u in users)
                result.Add(await ToDtoAsync(u));

            return result;
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(string id)
        {
            var user = await _context.Users.Include(u => u.Comments).Include(u => u.Likes).Include(u => u.SocialMedias).Include(u => u.ArtWorks).FirstOrDefaultAsync(u => u.Id == id);
            return user == null ? NotFound() : user;
        }
        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<ActionResult<User>> PostUser(User user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetUser), new { id = user.Id }, user);
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDto dto)
        {
            var user = new User
            {
                UserName = dto.Username,
                Email = dto.Email,
                CreatedAt = DateTime.Now,
                Birth = dto.Birth 
            };

            var result = await _userManager.CreateAsync(user, dto.Password);

            if (!result.Succeeded)
                return BadRequest(result.Errors);

            
            var age = CalcAge(user.Birth);
            string role = "User";
            if (age < 18) role = "MinorUser";

            await _userManager.AddToRoleAsync(user, role);

            return Ok(await ToDtoAsync(user)); 
        }

        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(string id, UpdateUserDto dto)
        {
            var meId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var isAdmin = User.IsInRole("Admin");
            if (!isAdmin && meId != id) return Forbid();

            var user = await _context.Users.FindAsync(id);
            if (user is null) return NotFound();

            if (!string.IsNullOrWhiteSpace(dto.Username))
                user.UserName = dto.Username;

            if (dto.Birth.HasValue)
                user.Birth = dto.Birth;

            await _context.SaveChangesAsync();
            return NoContent();
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(string id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null) return NotFound();
            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
            return NoContent();
        }


        [Authorize]
        [HttpPut("me")]
        public async Task<IActionResult> UpdateMe(UpdateUserDto dto)
        {
            var meId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var user = await _context.Users.FindAsync(meId);
            if (user is null) return NotFound();

            if (!string.IsNullOrWhiteSpace(dto.Username))
                user.UserName = dto.Username;

            if (dto.Birth.HasValue)
                user.Birth = dto.Birth;

            await _context.SaveChangesAsync();
            return NoContent();
        }

        [Authorize]
        [HttpGet("me")]
        public async Task<ActionResult<UserDto>> GetMe()
        {
            var meId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var user = await _context.Users.FindAsync(meId);
            if (user is null) return NotFound();

            return await ToDtoAsync(user);
        }




        private static int CalcAge(DateTime? birth)
        {
            if (birth is null) return 0;
            var today = DateTime.UtcNow.Date;
            var age = today.Year - birth.Value.Year;
            if (birth.Value.Date > today.AddYears(-age)) age--;
            return age;
        }


        private async Task<UserDto> ToDtoAsync(User u)
        {
            var roles = await _userManager.GetRolesAsync(u);
            var role = roles.FirstOrDefault() ?? "User";

            return new UserDto(
                u.Id,
                u.Email ?? string.Empty,
                u.UserName ?? string.Empty,
                u.CreatedAt,
                u.LastLogin,
                CalcAge(u.Birth),
                role,
                u.Birth
            );
        }

        public record RegisterDto(
            string Email,
            string Username,
            string Password,
            DateTime? Birth 
        );
        public record UserDto(
            string Id,
            string Email,
            string Username,
            DateTime CreatedAt,
            DateTime? LastLogin,
            int Age,
            string Role,
            DateTime? Birth 
        );

    }

}
