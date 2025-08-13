using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Gallerian.Server.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

namespace Gallerian.Server.Data
{
	public class GallerianContext : IdentityDbContext<IdentityUser>
	{
		public GallerianContext(DbContextOptions<GallerianContext> options)
			: base(options)
		{
		}

		public DbSet<Gallerian.Server.Models.ArtWork> ArtWork { get; set; } = default!;
		public DbSet<Gallerian.Server.Models.Categories> Categories { get; set; } = default!;
		public DbSet<Gallerian.Server.Models.Comments> Comments { get; set; } = default!;
		public DbSet<Gallerian.Server.Models.User> Users { get; set; } = default!;
		public DbSet<Gallerian.Server.Models.Likes> Likes { get; set; } = default!;
		public DbSet<Gallerian.Server.Models.SocialMedia> SocialMedias { get; set; } = default!;

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			base.OnModelCreating(modelBuilder);
			// Many-to-many relationship between ArtWork and Categories
			modelBuilder.Entity<ArtWork>()
				.HasMany(a => a.Categories)
				.WithMany(c => c.ArtWorks);
			// One-to-many: ArtWork -> Comments
			modelBuilder.Entity<ArtWork>()
				.HasMany(a => a.Comments)
				.WithOne(c => c.ArtWork)
				.HasForeignKey(c => c.ArtWorkId);
			// One-to-many: User -> Comments (explicit FK mapping)
			modelBuilder.Entity<Comments>()
				.HasOne(c => c.User)
				.WithMany(u => u.Comments)
				.HasForeignKey(c => c.UserId)
				.IsRequired(false);
			// One-to-many: User -> Likes
			modelBuilder.Entity<Likes>()
				.HasOne(l => l.User)
				.WithMany(u => u.Likes)
				.HasForeignKey(l => l.UserId)
				.OnDelete(DeleteBehavior.Restrict);
			// One-to-many: ArtWork -> Likes
			modelBuilder.Entity<Likes>()
				.HasOne(l => l.ArtWork)
				.WithMany()
				.HasForeignKey(l => l.ArtWorkId)
				.OnDelete(DeleteBehavior.Restrict);
			// Composite key for Likes
			modelBuilder.Entity<Likes>()
				.HasKey(l => new { l.ArtWorkId, l.UserId });
			// One-to-many: User -> SocialMedia
			modelBuilder.Entity<User>()
				.HasMany(u => u.SocialMedias)
				.WithOne()
				.HasForeignKey(sm => sm.UserId);
			// One-to-many: User -> ArtWorks
			modelBuilder.Entity<User>()
				.HasMany(u => u.ArtWorks)
				.WithOne(a => a.User)
				.HasForeignKey(a => a.UserId);
		}
	}
}
