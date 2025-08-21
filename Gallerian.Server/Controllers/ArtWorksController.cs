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
        public async Task<ActionResult<IEnumerable<ArtWorkDto>>> GetArtWorks()  
        {
            var artworks = await _context.ArtWork.Include(a => a.Categories).ToListAsync();
            return artworks.Select(a => new ArtWorkDto {
                Id = a.Id,
                UserId = a.UserId,
                Title = a.Title,
                ImageURL = a.ImageURL,
                Description = a.Description,
                Private = a.Private,
                ForSale = a.ForSale,
                CategoryIds = a.Categories.Select(c => c.Id).ToList()
            }).ToList();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ArtWorkDto>> GetArtWork(int id)
        {
            var a = await _context.ArtWork.Include(a => a.Categories).FirstOrDefaultAsync(a => a.Id == id);
            if (a == null) return NotFound();
            return new ArtWorkDto {
                Id = a.Id,
				UserId = a.UserId,
                Title = a.Title,
                ImageURL = a.ImageURL,
                Description = a.Description,
                Private = a.Private,
                ForSale = a.ForSale,
                CategoryIds = a.Categories.Select(c => c.Id).ToList()
            };
        }

        [HttpPost]
        public async Task<ActionResult<ArtWorkDto>> PostArtWork([FromBody] ArtWorkDto dto)
        {
            if (dto == null) return BadRequest("ArtWork data is null");
            var artWork = new ArtWork
            {
                UserId = dto.UserId,
                Title = dto.Title,
                Description = dto.Description,
                ImageURL = dto.ImageURL,
                UploadDate = DateTime.Now,
                Private = dto.Private ?? false,
                ForSale = dto.ForSale ?? false,
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
            return CreatedAtAction(nameof(GetArtWork), new { id = artWork.Id }, dto);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutArtWork(int id, [FromBody] ArtWorkDto dto)
        {
            if (dto == null) return BadRequest("ArtWork data is null");
            var artWork = await _context.ArtWork.Include(a => a.Categories).FirstOrDefaultAsync(a => a.Id == id);
            if (artWork == null) return NotFound();
            artWork.UserId = dto.UserId;
            artWork.Title = dto.Title;
            artWork.Description = dto.Description;
            artWork.ImageURL = dto.ImageURL;
            artWork.Private = dto.Private ?? false;
            artWork.ForSale = dto.ForSale ?? false;
            artWork.Categories.Clear();
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

        [HttpPost("search")]
        public async Task<ActionResult<IEnumerable<ArtWorkDto>>> SearchArtWorks([FromBody] ArtWorkSearchDto searchDto)
        {
            var artworks = _context.ArtWork.Include(a => a.Categories).AsQueryable();

            if (!string.IsNullOrEmpty(searchDto.Title))
            {
                artworks = artworks.Where(a => a.Title.Contains(searchDto.Title));
            }

            if (searchDto.ForSale.HasValue)
            {
                artworks = artworks.Where(a => a.ForSale == searchDto.ForSale.Value);
            }

            if (!string.IsNullOrEmpty(searchDto.Description))
            {
                artworks = artworks.Where(a => a.Description.Contains(searchDto.Description));
            }

            if (searchDto.CategoryIds != null && searchDto.CategoryIds.Any())
            {
                artworks = artworks.Where(a => a.Categories.Any(c => searchDto.CategoryIds.Contains(c.Id)));
            }

            if (!string.IsNullOrEmpty(searchDto.Category))
            {
                artworks = artworks.Where(a => a.Categories.Any(c => c.Category.Contains(searchDto.Category)));
            }

            var result = await artworks.ToListAsync();

            return result.Select(a => new ArtWorkDto
            {
                Id = a.Id,
                UserId = a.UserId,
                Title = a.Title,
                ImageURL = a.ImageURL,
                Description = a.Description,
                Private = a.Private,
                ForSale = a.ForSale,
                CategoryIds = a.Categories.Select(c => c.Id).ToList()
            }).ToList();
        }
    }
}

