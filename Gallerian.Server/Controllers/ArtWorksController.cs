using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Gallerian.Server.Data;
using Gallerian.Server.Models;
using Gallerian.Server.Models.Dtos;

namespace Gallerian.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ArtWorksController : ControllerBase
    {
        private readonly GallerianContext _context;
        public ArtWorksController(GallerianContext context) => _context = context;

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ArtWork>>> GetArtWorks() => await _context.ArtWork.Include(a => a.Categories).Include(a => a.Comments).ToListAsync();

        [HttpGet("{id}")]
        public async Task<ActionResult<ArtWork>> GetArtWork(int id)
        {
            var artWork = await _context.ArtWork.Include(a => a.Categories).Include(a => a.Comments).FirstOrDefaultAsync(a => a.Id == id);
            return artWork == null ? NotFound() : artWork;
        }

        [HttpPost]
        public async Task<ActionResult<ArtWork>> PostArtWork([FromBody] ArtWorkDto dto)
        {
            if (dto == null) return BadRequest("ArtWork data is null");
            var artWork = new ArtWork
            {
                UserId = dto.UserId,
				Title = dto.Title,
                Description = dto.Description,
                ImageURL = dto.ImageURL,
				UploadDate = DateTime.Now,
                Private = (bool)dto.Private,
                ForSale = (bool)dto.ForSale,
				Categories = new List<Categories>(),
                Comments = new List<Comments>() 
            };
            if (dto.CategoryIds != null)
            {
                foreach (var category in dto.CategoryIds)
                {
                    var existingCategory = await _context.Categories.FindAsync(category);
                    if (existingCategory != null)
                    {
                        artWork.Categories.Add(existingCategory);
                    }
                }
			}
			_context.ArtWork.Add(artWork);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetArtWork), new { id = artWork.Id }, artWork);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutArtWork(int id, ArtWork artWork)
        {
            if (id != artWork.Id) return BadRequest();
            _context.Entry(artWork).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteArtWork(int id)
        {
            var artWork = await _context.ArtWork.FindAsync(id);
            if (artWork == null) return NotFound();
            _context.ArtWork.Remove(artWork);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpGet("search")]
        public async Task<ActionResult<IEnumerable<ArtWork>>> SearchArtWorks([FromQuery] string query)
        {
            if (string.IsNullOrWhiteSpace(query))
                return BadRequest("Query is required.");

            var results = await _context.ArtWork
                .Include(a => a.Categories)
                .Include(a => a.Comments)
                .Where(a => a.Title.Contains(query) || a.Description.Contains(query))
                .ToListAsync();

            return results;
        }
    }
}