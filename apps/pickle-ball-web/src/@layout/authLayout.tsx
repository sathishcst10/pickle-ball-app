import { AppIcon } from "../@components/_icons/app_logo"

export const AuthLayout: React.FC = ({ children } : any) => {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-6 col-lg-5 col-xl-4 p-0">
                    <div className="d-flex flex-column h-100 bg-white rounded-3 shadow-lg">
                        <div className="d-flex flex-column align-items-center justify-content-center p-4">
                            <AppIcon />
                            <h1 className="h3 mt-3">Welcome to Pickle Ball</h1>
                            <p className="text-muted">Sign in to your account to continue</p>
                        </div>
                        <div className="d-flex flex-column align-items-center justify-content-center p-4">
                            {children}
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-lg-7 col-xl-8 p-0">
                    <div className="d-flex flex-column h-100 bg-body
                    bg-gradient">
                        <div className="d-flex flex-column align-items-center justify-content-center p-4">
                            <img src="/assets/images/auth-bg.jpg" alt="auth-bg" className="img-fluid" />
                        </div>
                    </div>
                </div>
            </div>
        </div>        
    )
}