import React, { useEffect, useState, useRef } from 'react';
import {
  Container,
  Badge,
  Image,
  Overlay,
} from 'react-bootstrap';
import { FaBell } from 'react-icons/fa';
import { getUserNotifications } from '../services/userService';

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
        <div
          className="shadow border bg-white rounded"
          style={{
            minWidth: '250px',
            maxWidth: '320px',
            maxHeight: '300px',
            overflowY: 'auto',
            marginTop: '8px',
            zIndex: 9999,
            padding: '0.75rem',
          }}
        >
          <h6 className="mb-3 fw-bold">Notifications</h6>
          {notifications.length === 0 ? (
            <div className="text-muted text-center">No Notifications!</div>
          ) : (
            <div>
              {notifications.map((note, index) => (
                <div key={index}>
                  <div className="mb-1">{note.message}</div>
                  {index < notifications.length - 1 && <hr className="my-2" />}
                </div>
              ))}
            </div>
          )}
        </div>
      </Overlay>

      {/* Profile Icon */}
      <Image
        ref={profileRef}
        src="https://www.gravatar.com/avatar?d=mp&s=32"
        roundedCircle
        alt="Profile"
        style={{ width: '32px', height: '32px', cursor: 'pointer' }}
        onClick={handleProfileClick}
      />

      {/* Profile Popover */}
      <Overlay
        show={showProfilePopover}
        target={profileRef.current}
        placement="bottom-end"
        containerPadding={10}
        rootClose
        onHide={() => setShowProfilePopover(false)}
      >
        <div
          className="shadow border bg-white rounded"
          style={{
            display: 'inline-block',
            padding: '0.75rem',
            marginTop: '8px',
            zIndex: 9999,
            whiteSpace: 'nowrap',
            maxWidth: '100%',
          }}
        >
          <h6 className="fw-bold mb-2">Profile</h6>
          <ul className="list-unstyled small mb-0">
            <li><strong>Name:</strong> {user.name}</li>
            <li><strong>Email:</strong> {user.email}</li>
            <li><strong>Role:</strong> {user.role}</li>
            <li><strong>Permission:</strong> {user.permission}</li>
          </ul>
        </div>
      </Overlay>
    </Container>
  );
};

export default UserNavbar;
