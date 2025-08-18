using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Gallerian.Server.Migrations
{
    /// <inheritdoc />
    public partial class AddUserBirth : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "Birth",
                table: "AspNetUsers",
                type: "datetime2",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Birth",
                table: "AspNetUsers");
        }
    }
}
