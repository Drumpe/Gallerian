using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Gallerian.Server.Data;
using Gallerian.Server.Models;
using Microsoft.AspNetCore.Authorization;

namespace Gallerian.Server.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
	[ApiController]
    public class LikesController : ControllerBase
    {
        private readonly GallerianContext _context;
        public LikesController(GallerianContext context) => _context = context;
        [AllowAnonymous]
		[HttpGet]
        public async Task<ActionResult<IEnumerable<Likes>>> GetLikes() => await _context.Likes.Include(l => l.User).Include(l => l.ArtWork).ToListAsync();
        [AllowAnonymous]
		[HttpGet("artwork/{artWorkId}/user/{userId}")]
        public async Task<ActionResult<Likes>> GetLike(int artWorkId, string userId)
        {
            var like = await _context.Likes.Include(l => l.User).Include(l => l.ArtWork).FirstOrDefaultAsync(l => l.ArtWorkId == artWorkId && l.UserId == userId);
            return like == null ? NotFound() : like;
        }

        [HttpPost]
        public async Task<ActionResult<Likes>> PostLike(Likes like)
        {
            _context.Likes.Add(like);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetLike), new { artWorkId = like.ArtWorkId, userId = like.UserId }, like);
        }

        [HttpDelete("artwork/{artWorkId}/user/{userId}")]
        public async Task<IActionResult> DeleteLike(int artWorkId, string userId)
        {
            var like = await _context.Likes.FindAsync(artWorkId, userId);
            if (like == null) return NotFound();
			// Check if the user is authorized to delete this like
            if (like.UserId != User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value && !User.IsInRole("Admin"))
            {
                return Forbid("You are not authorized to delete this like.");
			}
			_context.Likes.Remove(like);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
