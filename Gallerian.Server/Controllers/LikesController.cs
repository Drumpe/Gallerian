using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Gallerian.Server.Data;
using Gallerian.Server.Models;
using Gallerian.Server.Models.Dtos;

namespace Gallerian.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LikesController : ControllerBase
    {
        private readonly GallerianContext _context;
        public LikesController(GallerianContext context) => _context = context;

        [HttpGet]
        public async Task<ActionResult<IEnumerable<LikeDto>>> GetLikes()
        {
            var likes = await _context.Likes.ToListAsync();
            return likes.Select(l => new LikeDto
            {
                Id = l.Id,
                ArtWorkId = l.ArtWorkId,
                UserId = l.UserId,
                LikedAt = l.LikedAt
            }).ToList();
        }

        [HttpGet("artwork/{artWorkId}/user/{userId}")]
        public async Task<ActionResult<LikeDto>> GetLike(int artWorkId, string userId)
        {
            var l = await _context.Likes.FirstOrDefaultAsync(l => l.ArtWorkId == artWorkId && l.UserId == userId);
            if (l == null) return NotFound();
            return new LikeDto
            {
                Id = l.Id,
                ArtWorkId = l.ArtWorkId,
                UserId = l.UserId,
                LikedAt = l.LikedAt
            };
        }

        [HttpPost]
        public async Task<ActionResult<LikeDto>> PostLike(LikeDto dto)
        {
            var like = new Likes
            {
                ArtWorkId = dto.ArtWorkId,
                UserId = dto.UserId,
                LikedAt = dto.LikedAt
            };
            _context.Likes.Add(like);
            await _context.SaveChangesAsync();
            dto.Id = like.Id;
            return CreatedAtAction(nameof(GetLike), new { artWorkId = like.ArtWorkId, userId = like.UserId }, dto);
        }

        [HttpDelete("artwork/{artWorkId}/user/{userId}")]
        public async Task<IActionResult> DeleteLike(int artWorkId, string userId)
        {
            var like = await _context.Likes.FirstOrDefaultAsync(l => l.ArtWorkId == artWorkId && l.UserId == userId);
            if (like == null) return NotFound();
            _context.Likes.Remove(like);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
