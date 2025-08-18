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
    public class CommentsController : ControllerBase
    {
        private readonly GallerianContext _context;
        public CommentsController(GallerianContext context) => _context = context;
        [AllowAnonymous]
		[HttpGet]
        public async Task<ActionResult<IEnumerable<Comments>>> GetComments() => await _context.Comments.Include(c => c.User).Include(c => c.ArtWork).ToListAsync();
        [AllowAnonymous]
		[HttpGet("{id}")]
        public async Task<ActionResult<Comments>> GetComment(int id)
        {
            var comment = await _context.Comments.Include(c => c.User).Include(c => c.ArtWork).FirstOrDefaultAsync(c => c.Id == id);
            return comment == null ? NotFound() : comment;
        }

		[HttpPost]
        public async Task<ActionResult<Comments>> PostComment(Comments comment)
        {
            _context.Comments.Add(comment);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetComment), new { id = comment.Id }, comment);
        }

		[HttpPut("{id}")]
        public async Task<IActionResult> PutComment(int id, Comments comment)
        {
            if (id != comment.Id) return BadRequest();
			// Check if the user is authorized to update this comment
            if (comment.UserId != User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value && !User.IsInRole("Admin"))
            {
                return Forbid("You are not authorized to update this comment.");
			}
			_context.Entry(comment).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

		[HttpDelete("{id}")]
        public async Task<IActionResult> DeleteComment(int id)
        {
            var comment = await _context.Comments.FindAsync(id);
            if (comment == null) return NotFound();

			// Check if the user is authorized to delete this comment
            if (comment.UserId != User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value && !User.IsInRole("Admin"))
            {
                return Forbid("You are not authorized to delete this comment.");
			}

			_context.Comments.Remove(comment);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
