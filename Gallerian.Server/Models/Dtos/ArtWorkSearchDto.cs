namespace Gallerian.Server.Models.Dtos
{
    public class ArtWorkSearchDto
    {
        public string? Title { get; set; }
        public bool? ForSale { get; set; }
        public string? Description { get; set; }
        public List<int>? CategoryIds { get; set; }
    }
}
