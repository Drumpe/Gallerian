using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Gallerian.Server.Data;
using Gallerian.Server.Models;

namespace Gallerian.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SocialMediaController : ControllerBase
    {
        private readonly GallerianContext _context;
        public SocialMediaController(GallerianContext context) => _context = context;

        [HttpGet]
        public async Task<ActionResult<IEnumerable<SocialMedia>>> GetSocialMedias() => await _context.SocialMedias.ToListAsync();

        [HttpGet("{userId}")]
        public async Task<ActionResult<IEnumerable<SocialMedia>>> GetSocialMediasByUser(string userId)
        {
            var socialMedias = await _context.SocialMedias.Where(sm => sm.UserId == userId).ToListAsync();
            return socialMedias.Count == 0 ? NotFound() : socialMedias;
        }

        [HttpPost]
        public async Task<ActionResult<SocialMedia>> PostSocialMedia(SocialMedia socialMedia)
        {
            _context.SocialMedias.Add(socialMedia);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetSocialMediasByUser), new { userId = socialMedia.UserId }, socialMedia);
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
