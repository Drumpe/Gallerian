namespace Gallerian.Server.Models.Dtos
{
    public class CommentDto
    {
        public int Id { get; set; }
        public int ArtWorkId { get; set; }
        public string UserId { get; set; }
        public string Comment { get; set; }
        public DateTime TimeStamp { get; set; }
    }
}