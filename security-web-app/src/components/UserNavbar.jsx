import React, { useEffect, useState, useRef } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import {
  Container,
  Badge,
  Overlay,
} from 'react-bootstrap';

import { FaBell } from 'react-icons/fa';
import { getUserNotifications, markNotificationAsRead } from '../services/userService';

const UserNavbar = ({ user }) => {
  const [notificationCount, setNotificationCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [showNotifPopover, setShowNotifPopover] = useState(false);
  const [showProfilePopover, setShowProfilePopover] = useState(false);
  const bellRef = useRef(null);
  const profileRef = useRef(null);

  const fetchNotifications = async () => {
    try {
      const res = await getUserNotifications(user.email);
      const all = res.data || [];
      const unread = all.filter(n => !n.read);
      setNotifications(all);
      setNotificationCount(unread.length);
    } catch (err) {
      console.error('Error fetching notifications:', err);
    }
  };

  const markNotificationAsReadHandler = async (id) => {
    try {
      await markNotificationAsRead(id);
      fetchNotifications();
    } catch (err) {
      console.error('Failed to mark notification as read:', err);
    }
  };



  const handleBellClick = async () => {
    await fetchNotifications();
    setShowNotifPopover(!showNotifPopover);
    setShowProfilePopover(false);
    setNotificationCount(0);
  };

  const handleProfileClick = () => {
    setShowProfilePopover(!showProfilePopover);
    setShowNotifPopover(false);
  };
  

  useEffect(() => {
    if (user && user.email) {
      fetchNotifications();
    }
    // eslint-disable-next-line
  }, [user]);

  return (
    <Container className="d-flex justify-content-end align-items-center gap-4 py-2">
      {/* Bell Icon */}
      <div
        className="position-relative"
        style={{ cursor: 'pointer' }}
        onClick={handleBellClick}
        ref={bellRef}
      >
        <FaBell size={22} className="text-dark" />
        {notificationCount > 0 && (
          <Badge
            bg="danger"
            pill
            className="position-absolute"
            style={{
              top: '-6px',
              right: '-6px',
              fontSize: '0.6rem',
              padding: '0.25em 0.4em',
              borderRadius: '50%',
            }}
          >
            {notificationCount}
          </Badge>
        )}
      </div>

      {/* Notification Popover */}
      <Overlay
        show={showNotifPopover}
        target={bellRef.current}
        placement="bottom-end"
        containerPadding={10}
        rootClose
        onHide={() => setShowNotifPopover(false)}
      >
        {({ placement, show, ...props }) => (
          <div
            {...props}
            className="shadow border bg-white rounded"
            style={{
              minWidth: '250px',
              maxWidth: '320px',
              maxHeight: '300px',
              overflowY: 'auto',
              marginTop: '8px',
              zIndex: 9999,
              padding: '0.75rem',
              ...props.style,
            }}
          >
            <h6 className="mb-3 fw-bold">Notifications</h6>
            {notifications.length === 0 ? (
              <div className="text-muted text-center">No Notifications!</div>
            ) : (
              <div>
                {notifications.map((note, index) => {
                  const formattedDate = new Date(note.timestamp).toLocaleString('en-IN', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true,
                  });

                  return (
                    <div
                      key={index}
                      onClick={() => {
                        if (!note.read) {
                          markNotificationAsReadHandler(note.id);
                        }
                      }}

                      className={`mb-2 p-2 rounded ${!note.read ? 'bg-light border-start border-4 border-primary' : ''}`}
                      style={{ cursor: 'pointer' }}
                    >
                      <div className="fw-medium d-flex justify-content-between align-items-center">
                        {note.message}
                        {!note.read && (
                          <span
                            className="ms-2 badge bg-primary rounded-circle"
                            style={{ width: 8, height: 8 }}
                          />
                        )}
                      </div>
                      <div className="text-muted small">{formattedDate}</div>
                      {index < notifications.length - 1 && <hr className="my-2" />}
                    </div>
                  );
                })}


              </div>
            )}
          </div>
        )}
      </Overlay>

      {/* Profile Icon */}
      <div
        style={{ cursor: 'pointer' }}
        onClick={handleProfileClick}
        ref={profileRef}
      >
        <FaUserCircle size={28} className="text-dark" />
      </div>

      {/* Profile Popover */}
      <Overlay
        show={showProfilePopover}
        target={profileRef.current}
        placement="bottom-end"
        containerPadding={10}
        rootClose
        onHide={() => setShowProfilePopover(false)}
      >
        {({ placement, show, ...props }) => (
          <div
            {...props}
            className="shadow border bg-white rounded"
            style={{
              display: 'inline-block',
              padding: '0.75rem',
              marginTop: '8px',
              zIndex: 9999,
              whiteSpace: 'nowrap',
              maxWidth: '100%',
              ...props.style,
            }}
          >
            <h6 className="fw-bold mb-2">Profile</h6>
            <ul className="list-unstyled small mb-0">
              <li><strong>Name:</strong> {user.name}</li>
              <li><strong>Email:</strong> {user.email}</li>
              {/* <li><strong>Role:</strong> {user.role}</li> */}
              <li><strong>Permission:</strong> {user.permission}</li>
            </ul>
          </div>
        )}
      </Overlay>
    </Container>
  );
};

export default UserNavbar;
