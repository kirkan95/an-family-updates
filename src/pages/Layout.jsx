import { Outlet, Link } from "react-router-dom";

const Layout = ({ objList }) => {
  return (
    <>
      <nav className="nav-menu">
        <div className="lexend-deca">
          <Link to="/" className="link">
            Home
          </Link>
        </div>
        {objList.map((article) => {
          console.log(article);

          return (
            <div key={article.objName} className="lexend-deca">
              <Link to={`/${article.objName}`} className="link">
                {article.data[0].sv_display_name}
              </Link>
            </div>
          );
        })}
      </nav>

      <Outlet />
    </>
  );
};

export default Layout;
