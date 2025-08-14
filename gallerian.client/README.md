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