const SignUpForm = () => {
  return (
    <main className="container my-5" aria-label="Sign up form for new artists">
      <h2 className="text-center mb-4">Sign Up</h2>
      <form aria-labelledby="signup-heading">
        <h2 id="signup-heading" className="visually-hidden">Sign Up Form</h2>
        <div className="mb-3">
          <label htmlFor="nameInput" className="form-label">Full Name</label>
          <input type="text" className="form-control" id="nameInput" aria-label="Full Name" />
        </div>

        <div className="mb-3">
          <label htmlFor="ageInput" className="form-label">Age</label>
          <input type="number" className="form-control" id="ageInput" aria-label="Age" />
        </div>

 {/* NEEDS JAVASCRIPT TO MAKE DYNAMIC SO USERS UNDER 18 SEE SOMETHING DIFFERENT THAN THOSE 18+ */}
        <div className="form-check mb-3" role="group" aria-label="Parental permission required">
          <input type="checkbox" className="form-check-input" id="parentPermissionCheck" />
          <label htmlFor="parentPermissionCheck" className="form-check-label">I have my parent's permission to sign up.</label>
        </div>
        
        <fieldset className="social-media-fieldset" aria-live="polite">
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
        <button type="submit" className="btn btn-primary w-100 mt-4">Submit</button>
      </form>
    </main>
  );
};

export default SignUpForm;