import React from 'react'

export const DemoFooter = () => {
  return (
    <footer className="footer footer-black footer-white" id="pie">
      <div className="container">
      <div className="Row">
          
          <div className="credits ml-auto">
            <span className="copyright">
              © {new Date().getFullYear()}, Hecho por{" "}
              <i className="fa fa-heart heart" /> humildes servidores
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
