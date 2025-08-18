using Gallerian.Server.Data;
using Gallerian.Server.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Gallerian.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
	[Authorize(Roles = "Admin")]
	public class CategoriesController : ControllerBase
    {
        private readonly GallerianContext _context;
        public CategoriesController(GallerianContext context) => _context = context;
		
        [AllowAnonymous]
		[HttpGet]
        public async Task<ActionResult<IEnumerable<Categories>>> GetCategories() => await _context.Categories.Include(c => c.ArtWorks).ToListAsync();
		
        [AllowAnonymous]
		[HttpGet("{id}")]
        public async Task<ActionResult<Categories>> GetCategory(int id)
        {
            var category = await _context.Categories.Include(c => c.ArtWorks).FirstOrDefaultAsync(c => c.Id == id);
            return category == null ? NotFound() : category;
        }

        [HttpPost]
        public async Task<ActionResult<Categories>> PostCategory(Categories category)
        {
            _context.Categories.Add(category);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetCategory), new { id = category.Id }, category);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutCategory(int id, Categories category)
        {
            if (id != category.Id) return BadRequest();
            _context.Entry(category).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCategory(int id)
        {
            var category = await _context.Categories.FindAsync(id);
            if (category == null) return NotFound();
            _context.Categories.Remove(category);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
