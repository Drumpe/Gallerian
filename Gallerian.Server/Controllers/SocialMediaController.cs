using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Gallerian.Server.Data;
using Gallerian.Server.Models;
using Gallerian.Server.Models.Dtos;

namespace Gallerian.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SocialMediaController : ControllerBase
    {
        private readonly GallerianContext _context;
        public SocialMediaController(GallerianContext context) => _context = context;

        [HttpGet]
        public async Task<ActionResult<IEnumerable<SocialMediaDto>>> GetSocialMedias() 
        {
            var socialMedias = await _context.SocialMedias.ToListAsync();
            return socialMedias.Select(sm => new SocialMediaDto {
                Id = sm.Id,
                UserId = sm.UserId,
                Link = sm.Link
            }).ToList();
        }

        [HttpGet("{userId}")]
        public async Task<ActionResult<IEnumerable<SocialMediaDto>>> GetSocialMediasByUser(string userId)
        {
            var socialMedias = await _context.SocialMedias.Where(sm => sm.UserId == userId).ToListAsync();
            if (socialMedias.Count == 0) return NotFound();
            return socialMedias.Select(sm => new SocialMediaDto {
                Id = sm.Id,
                UserId = sm.UserId,
                Link = sm.Link
            }).ToList();
        }

        [HttpPost]
        public async Task<ActionResult<SocialMediaDto>> PostSocialMedia(SocialMediaDto dto)
        {
            var socialMedia = new SocialMedia {
                UserId = dto.UserId,
                Link = dto.Link
            };
            _context.SocialMedias.Add(socialMedia);
            await _context.SaveChangesAsync();
            dto.Id = socialMedia.Id;
            return CreatedAtAction(nameof(GetSocialMediasByUser), new { userId = socialMedia.UserId }, dto);
        }

        [HttpDelete("{userId}/{link}")]
        public async Task<IActionResult> DeleteSocialMedia(string userId, string link)
        {
            var socialMedia = await _context.SocialMedias.FirstOrDefaultAsync(sm => sm.UserId == userId && sm.Link == link);
            if (socialMedia == null) return NotFound();
            _context.SocialMedias.Remove(socialMedia);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
