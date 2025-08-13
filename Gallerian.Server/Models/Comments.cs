namespace Gallerian.Server.Models
{
	public class Comments
	{
		public int Id { get; set; }
		public int ArtWorkId { get; set; }
		public string UserId { get; set; }
		public string Comment { get; set; }
		public DateTime TimeStamp { get; set; } = DateTime.Now;
		public User User { get; set; }
		public ArtWork ArtWork { get; set; }
	}
}
