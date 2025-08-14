using Microsoft.AspNetCore.Identity;

namespace Gallerian.Server.Models
{
	public class User : IdentityUser
	{
		//public string Password { get; set; }
		//public string Role { get; set; } = "User";
		public DateTime CreatedAt { get; set; } = DateTime.Now;
		public DateTime LastLogin { get; set; } = DateTime.Now;
		public ICollection<Comments> Comments { get; set; } = new List<Comments>();
		public ICollection<Likes> Likes { get; set; } = new List<Likes>();
		public ICollection<SocialMedia> SocialMedias { get; set; } = new List<SocialMedia>();
		public ICollection<ArtWork> ArtWorks { get; set; } = new List<ArtWork>();
	}
}
