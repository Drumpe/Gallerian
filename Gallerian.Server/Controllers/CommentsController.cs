using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Gallerian.Server.Data;
using Gallerian.Server.Models;

namespace Gallerian.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentsController : ControllerBase
    {
        private readonly GallerianContext _context;
        public CommentsController(GallerianContext context) => _context = context;

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Comments>>> GetComments() => await _context.Comments.Include(c => c.User).Include(c => c.ArtWork).ToListAsync();

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
            _context.Entry(comment).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteComment(int id)
        {
            var comment = await _context.Comments.FindAsync(id);
            if (comment == null) return NotFound();
            _context.Comments.Remove(comment);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
