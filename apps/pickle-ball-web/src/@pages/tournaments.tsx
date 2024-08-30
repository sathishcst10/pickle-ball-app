export const Tournaments: React.FC = () => {
    return (
      <div className="w-100 p-3" style={{overflow:"auto"}}>
        <h4>Groups</h4>
  
        <div className="container-fluid">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-3">
              {
                 [1,2,3,4,5,6,7,8,9,10].map((i) => {
                  return <div className="col">
                  <div className="card shadow-sm">
                    <svg
                      className="bd-placeholder-img card-img-top"
                      width="100%"
                      height="225"
                      xmlns="http://www.w3.org/2000/svg"
                      role="img"
                      aria-label="Placeholder: Thumbnail"
                      preserveAspectRatio="xMidYMid slice"
                      focusable="false"
                    >
                      <title>Placeholder</title>
                      <rect width="100%" height="100%" fill="#55595c"></rect>
                      <text x="50%" y="50%" fill="#eceeef" dy=".3em">
                        Thumbnail
                      </text>
                    </svg>
                    <div className="card-body">
                      <h5 className="card-title">Tournament-{i}</h5>
                      <p className="card-text">
                        This is a wider card with supporting text below as a natural
                        lead-in to additional content. This content is a little bit
                        longer.
                      </p>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="btn-group">
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-secondary"
                          >
                            View
                          </button>
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-secondary"
                          >
                            Edit
                          </button>
                        </div>
                        <small className="text-body-secondary">9 mins</small>
                      </div>
                    </div>
                  </div>
                </div>
                 })
              }
            
          </div>
        </div>
      </div>
    );
  };
  