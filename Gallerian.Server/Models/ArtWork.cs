using System;
using System.Collections.Generic;

namespace Gallerian.Server.Models
{
    public class ArtWork
    {
        public int Id { get; set; }

        // Foreign Key to AspNetUsers
        public string UserId { get; set; }

        // Navigation property to Identity User
        public User User { get; set; }

        public string Title { get; set; }
        public string ImageURL { get; set; }
        public string Description { get; set; }
        public DateTime UploadDate { get; set; } = DateTime.Now;
        public bool Private { get; set; } = false;
        public bool ForSale { get; set; } = false;

        // Navigation collections
        public ICollection<Categories> Categories { get; set; } = new List<Categories>();
        public ICollection<Comments> Comments { get; set; } = new List<Comments>();
    }
}
