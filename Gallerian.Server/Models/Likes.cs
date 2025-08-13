namespace Gallerian.Server.Models
{
	public class Likes
	{
		public int Id { get; set; }
		public int ArtWorkId { get; set; }
		public string UserId { get; set; }
		public DateTime LikedAt { get; set; } = DateTime.Now;
		public User User { get; set; }
		public ArtWork ArtWork { get; set; }
	}
}
