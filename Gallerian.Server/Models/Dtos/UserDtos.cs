namespace Gallerian.Server.Models.Dtos;

public record UserDto(
    string Id,
    string Email,
    string Username,
    DateTime CreatedAt,
    DateTime LastLogin,
    int Age,
    string Role
);


public record UpdateUserDto(string? Username);

public record ChangePasswordDto(string? OldPassword, string NewPassword);

public record RegisterDto(string Email, string Username, string Password);
