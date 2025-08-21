using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Gallerian.Server.Data;
using Gallerian.Server.Models;
using Gallerian.Server.Models.Dtos;
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
            return artworks.Select(a => new ArtWorkDto
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

        [HttpGet("{id}")]
        public async Task<ActionResult<ArtWorkDto>> GetArtWork(int id)
        {
            var a = await _context.ArtWork.Include(a => a.Categories).FirstOrDefaultAsync(a => a.Id == id);
            if (a == null) return NotFound();
            return new ArtWorkDto
            {
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


        [HttpPost("upload")]
        public async Task<ActionResult<ArtWorkDto>> UploadArtWork([FromForm] ArtWorkDto dto)
        {
            if (dto == null) return BadRequest("Invalid artwork data");

            string? imageUrl = null;

            if (dto.ArtworkImage != null && dto.ArtworkImage.Length > 0)
            {
                var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads");
                if (!Directory.Exists(uploadsFolder))
                    Directory.CreateDirectory(uploadsFolder);

                var uniqueFileName = $"{Guid.NewGuid()}{Path.GetExtension(dto.ArtworkImage.FileName)}";
                var filePath = Path.Combine(uploadsFolder, uniqueFileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await dto.ArtworkImage.CopyToAsync(stream);
                }

                imageUrl = $"/uploads/{uniqueFileName}";
            }
            else if (!string.IsNullOrEmpty(dto.ImageURL))
            {
                imageUrl = dto.ImageURL;
            }
            else
            {
                return BadRequest("No image provided (either file or URL required).");
            }

            var userId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized("User not logged in");
            }

            var artWork = new ArtWork
            {
                UserId = userId,
                Title = dto.Title,
                Description = dto.Description,
                ImageURL = imageUrl,
                UploadDate = DateTime.Now,
                Private = dto.Private ?? false,
                ForSale = dto.ForSale ?? false,
                Categories = new List<Categories>(),
                Comments = new List<Comments>()
            };

            if (dto.CategoryIds != null)
            {
                foreach (var categoryId in dto.CategoryIds)
                {
                    var existingCategory = await _context.Categories.FindAsync(categoryId);
                    if (existingCategory != null)
                    {
                        artWork.Categories.Add(existingCategory);
                    }
                }
            }

            _context.ArtWork.Add(artWork);
            await _context.SaveChangesAsync();

            return Ok(new ArtWorkDto
            {
                Id = artWork.Id,
                UserId = artWork.UserId,
                Title = artWork.Title,
                Description = artWork.Description,
                ImageURL = artWork.ImageURL,
                Private = artWork.Private,
                ForSale = artWork.ForSale,
                CategoryIds = artWork.Categories.Select(c => c.Id).ToList()
            });
        }
    }

    }
