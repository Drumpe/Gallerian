using Gallerian.Server.Data;
using Gallerian.Server.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Gallerian.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
	[Authorize]
	public class ArtWorksController : ControllerBase
    {
        private readonly GallerianContext _context;
        public ArtWorksController(GallerianContext context) => _context = context;

		[AllowAnonymous]
		[HttpGet]
        public async Task<ActionResult<IEnumerable<ArtWork>>> GetArtWorks() => await _context.ArtWork.Include(a => a.Categories).Include(a => a.Comments).ToListAsync();

		[AllowAnonymous]
		[HttpGet("{id}")]
        public async Task<ActionResult<ArtWork>> GetArtWork(int id)
        {
            var artWork = await _context.ArtWork.Include(a => a.Categories).Include(a => a.Comments).FirstOrDefaultAsync(a => a.Id == id);
            return artWork == null ? NotFound() : artWork;
        }

        [HttpPost]
        public async Task<ActionResult<ArtWork>> PostArtWork(ArtWork artWork)
        {
            if (artWork == null) return BadRequest("ArtWork cannot be null");
			var currentUserId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(currentUserId)) return Unauthorized("User not authenticated");
            if (artWork.UserId != currentUserId && !User.IsInRole("Admin")) return BadRequest("User ID mismatch");

			_context.ArtWork.Add(artWork);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetArtWork), new { id = artWork.Id }, artWork);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutArtWork(int id, ArtWork artWork)
        {
			if (artWork == null) return BadRequest("ArtWork cannot be null");
			var currentUserId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
			if (string.IsNullOrEmpty(currentUserId)) return Unauthorized("User not authenticated");
			if (artWork.UserId != currentUserId && !User.IsInRole("Admin")) return BadRequest("User ID mismatch");

			if (id != artWork.Id) return BadRequest("No ArtWork found");
            _context.Entry(artWork).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteArtWork(int id)
        {
			var currentUserId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
			if (string.IsNullOrEmpty(currentUserId)) return Unauthorized("User not authenticated");

			var artWork = await _context.ArtWork.FindAsync(id);
            if (artWork == null) return NotFound();
			if (artWork.UserId != currentUserId && !User.IsInRole("Admin")) return BadRequest("User ID mismatch");

            _context.ArtWork.Remove(artWork);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
