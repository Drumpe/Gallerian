using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Gallerian.Server.Data;
using Gallerian.Server.Models;
using Gallerian.Server.Models.Dtos;

namespace Gallerian.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentsController : ControllerBase
    {
        private readonly GallerianContext _context;
        public CommentsController(GallerianContext context) => _context = context;

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CommentDto>>> GetComments()
        {
            var comments = await _context.Comments.ToListAsync();
            return comments.Select(c => new CommentDto {
                Id = c.Id,
                ArtWorkId = c.ArtWorkId,
                UserId = c.UserId,
                Comment = c.Comment,
                TimeStamp = c.TimeStamp
            }).ToList();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CommentDto>> GetComment(int id)
        {
            var c = await _context.Comments.FindAsync(id);
            if (c == null) return NotFound();
            return new CommentDto {
                Id = c.Id,
                ArtWorkId = c.ArtWorkId,
                UserId = c.UserId,
                Comment = c.Comment,
                TimeStamp = c.TimeStamp
            };
        }

        [HttpPost]
        public async Task<ActionResult<CommentDto>> PostComment(CommentDto dto)
        {
            var comment = new Comments {
                ArtWorkId = dto.ArtWorkId,
                UserId = dto.UserId,
                Comment = dto.Comment,
                TimeStamp = dto.TimeStamp
            };
            _context.Comments.Add(comment);
            await _context.SaveChangesAsync();
            dto.Id = comment.Id;
            return CreatedAtAction(nameof(GetComment), new { id = comment.Id }, dto);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutComment(int id, CommentDto dto)
        {
            if (id != dto.Id) return BadRequest();
            var comment = await _context.Comments.FindAsync(id);
            if (comment == null) return NotFound();
            comment.Comment = dto.Comment;
            comment.TimeStamp = dto.TimeStamp;
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
