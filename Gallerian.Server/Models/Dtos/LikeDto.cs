namespace Gallerian.Server.Models.Dtos
{
    public class LikeDto
    {
        public int Id { get; set; }
        public int ArtWorkId { get; set; }
        public string UserId { get; set; }
        public DateTime LikedAt { get; set; }
    }
}