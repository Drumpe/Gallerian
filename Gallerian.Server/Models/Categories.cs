using System.ComponentModel.DataAnnotations;

namespace Gallerian.Server.Models
{
	public class Categories
	{
		public int Id { get; set; }
		public string Category { get; set; }
		public ICollection<ArtWork> ArtWorks { get; set; } = new List<ArtWork>();
	}
}