# Gallerian 

## client

## server
  Update the `appsettings.json` file with your database connection string.
  "ConnectionStrings": {
    "GallerianContext": "Server=(localdb)\\mssqllocaldb;Database=Gallerian;Trusted_Connection=True;MultipleActiveResultSets=true"
  }
  And I think you have to run the migrations:
  ```
  Add-Migration InitialCreate
  Update-Database
  ```

Add in appsettings
```
"AllowedHosts": "*",
  "ConnectionStrings": {
    "GallerianContext": "Server=(localdb)\\mssqllocaldb;Database=Gallerian;Trusted_Connection=True;MultipleActiveResultSets=true"
  },
  "Jwt": {
    "Issuer": "Gallerian.Server",
    "Audience": "Gallerian.Client",
    "ExpiresMinutes": 60
  }
  ```

  Add secret (right click server -> manage user secrets)

  ```
{
  "Jwt": { "Key": "PUT-A-VERY-LONG-RANDOM-SECRET-HERE" }
}
  ```
