using Microsoft.AspNetCore.Http;
using System.Collections.Generic;

namespace Gallerian.Server.Models.Dtos
{
    public class ArtWorkDto
    {
        public int Id { get; set; }   
        public string? UserId { get; set; }
        public string? Title { get; set; }
        public string? ImageURL { get; set; }          
        public IFormFile? ArtworkImage { get; set; }   
        public string? Description { get; set; }
        public bool? Private { get; set; } = false; 
        public bool? ForSale { get; set; } = false;
        public List<int>? CategoryIds { get; set; }
    }
}
