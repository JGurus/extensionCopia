import React, { useEffect, useContext } from "react";
import UserContext from "../context/auth/authContext";
import AdminContext from "../context/admin/adminContext";
import "./Active.css";
function Active() {
  const { user } = useContext(UserContext);
  const { list, obtenerUsuarios, activeUser } = useContext(AdminContext);
  useEffect(() => {
    if (user !== null) {
      obtenerUsuarios();
    }
  }, [user]);
  return (
    <div>
      <div className="list__users">
        {list !== null
          ? list.map((user) => (
              <div className="users" key={user._id}>
                <p>{user.usuario}</p>
                <label className="switch">
                  <input
                    type="checkbox"
                    name="activar"
                    defaultChecked={user.active}
                    onChange={() => {
                      activeUser({ active: !user.active, id: user._id });
                    }}
                  />
                  <span className="slider round"></span>
                </label>
              </div>
            ))
          : null}
      </div>
    </div>
  );
}

export default Active;
