import { Table, Button } from "react-bootstrap";

/**
 * แสดงตารางรายชื่อผู้ใช้พร้อมปุ่ม actions
 *
 * @param {Array} rows - ข้อมูลผู้ใช้
 * @param {Function} onView - Callback เมื่อกดปุ่ม View
 * @param {Function} onVerify - Callback เมื่อกดปุ่ม Verify
 * @param {Function} onReject - Callback เมื่อกดปุ่ม Reject
 */
export default function UserTable({ rows, onView, onVerify, onReject }) {
  return (
    <div>
      <Table hover style={{ width: "100%", tableLayout: "fixed" }}>
        <thead>
          <tr>
            <th style={{ width: "18%" }}>Name</th>
            <th style={{ width: "22%" }}>Email</th>
            <th style={{ width: "10%" }}>Status</th>
            <th style={{ width: "13%" }}>Registered</th>
            <th style={{ width: "13%" }}>Last active</th>
            <th style={{ width: "24%" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-muted text-center">
                No users
              </td>
            </tr>
          ) : (
            rows.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td
                  style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {user.email}
                </td>
                <td>{user.status}</td>
                <td>{user.registeredAt}</td>
                <td>{user.lastActiveAt}</td>
                <td className="d-flex gap-2" style={{ whiteSpace: "nowrap" }}>
                  <Button
                    size="sm"
                    variant="outline-secondary"
                    onClick={() => onView?.(user)}
                  >
                    View
                  </Button>
                  <Button
                    size="sm"
                    variant="outline-success"
                    onClick={() => onVerify?.(user)}
                  >
                    Verify
                  </Button>
                  <Button
                    size="sm"
                    variant="outline-danger"
                    onClick={() => onReject?.(user)}
                  >
                    Reject
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
}
