const EditProfileForm = () => {
  return (
    <main className="container my-5" aria-label="Edit user profile form">
      <h2 className="text-center mb-4">Edit Profile</h2>
      <form aria-labelledby="edit-profile-heading">
        <h2 id="edit-profile-heading" className="visually-hidden">Edit Profile Form</h2>
        
        <div className="mb-3">
          <label htmlFor="bioInput" className="form-label">Bio</label>
          <textarea className="form-control" id="bioInput" rows="4" aria-label="Artist bio"></textarea>
        </div>

        <div className="mb-3">
          <label htmlFor="profileImageInput" className="form-label">Profile Image</label>
          
          {/* NEEDS JAVASCRIPT: The logic here should handle the image file upload and display a preview of the new image. */}
          <input type="file" className="form-control" id="profileImageInput" aria-label="Upload a new profile image" />
        </div>

        <fieldset className="social-media-fieldset">
          <legend className="h5 mt-4">Social Media (Optional)</legend>
          <div className="mb-3">
            <label htmlFor="twitterInput" className="form-label">Twitter</label>
            <input type="text" className="form-control" id="twitterInput" aria-label="Twitter profile link" />
          </div>
          <div className="mb-3">
            <label htmlFor="instagramInput" className="form-label">Instagram</label>
            <input type="text" className="form-control" id="instagramInput" aria-label="Instagram profile link" />
          </div>
        </fieldset>

        <button type="submit" className="btn btn-primary w-100 mt-4">Save Changes</button>
      </form>
    </main>
  );
};

export default EditProfileForm;