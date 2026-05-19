"use client";
import { useState, useEffect, useMemo } from "react";
import CustomeInput from "../../_components/CustomeInput";
import { authClient } from "@/lib/auth-client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import CustomSelect from "../../_components/CustomSelect";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FieldGroup } from "@/components/ui/field";
import CustomeEditField from "../../_components/CustomeEditField";
import CustomEditGroupButtons from "../../_components/CustomEditGroupButtons";
import { updateUser } from "@/actions/user";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Users = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [selectRole, setSelectRole] = useState("");
  useEffect(() => {
    fetchUsers();
  }, [search]); // Re-fetch when search changes

  const fetchUsers = async () => {
    try {
      const { data } = await authClient.admin.listUsers({
        query: {
          searchValue: search || undefined, // Use the search state
          sortBy: "createdAt",
          sortDirection: "desc",
        },
      });
      setUsers(data?.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  const filteredUsers = useMemo(() => {
    if (selectRole) {
      return users.filter((u) => u.role === selectRole);
    }
    return users;
  }, [users, selectRole]);
  const roleOptions = useMemo(() => {
    return [...new Set(users.map((u) => u.role))].map((role) => ({
      value: role,
      label: role,
    }));
  }, [users]);
  const router = useRouter();
  async function handleEditUser(formData: FormData): Promise<void> {
    const result = await updateUser(formData);
    if (result.success) {
      toast.success("Table updated");
      fetchUsers();
    } else {
      toast.error("Failed to update Table");
    }
  }
  return (
    <div>
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
        <div className="flex items-center gap-2 sm:gap-4">
          <Button
            onClick={() => router.push("/add")}
            className="whitespace-nowrap"
          >
            <Plus className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:inline">Add</span>
          </Button>

          <CustomeInput
            type="text"
            placeholder="Search by name or phone"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 sm:flex-initial"
          />
        </div>

        <CustomSelect
          data={roleOptions}
          value={selectRole}
          onValueChange={setSelectRole}
          placeholder="Select a role"
          label="Roles"
          className="w-full sm:w-[180px] md:w-[200px]"
        />
      </div>
      <Table className="mt-5">
        <TableCaption>List of users</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name || user.email}</TableCell>
              <TableCell>{user.role || "User"}</TableCell>
              <TableCell>{user.phone || "-"}</TableCell>
              <TableCell>{user.status || "Active"}</TableCell>
              <TableCell>
                {user.createdAt
                  ? new Date(user.createdAt).toLocaleDateString()
                  : "-"}
              </TableCell>
              <TableCell className="text-right">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      size="sm"
                      className="flex-1 bg-amber-500 hover:bg-amber-600 text-white"
                    >
                      edit
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Edit User</DialogTitle>
                    </DialogHeader>
                    <form action={handleEditUser}>
                      <FieldGroup className="space-y-4">
                        <CustomeEditField
                          hidden={true}
                          id="id"
                          name="id"
                          defaultValue={user.id}
                        />
                        <CustomeEditField
                          id="name"
                          name="name"
                          label="Name"
                          defaultValue={user.name}
                          type="text"
                        />
                        <Select name="role" defaultValue={user.role}>
                          <SelectTrigger className="bg-white/5 border-amber-500/30 text-white">
                            <SelectValue placeholder="Select a role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="admin">Admin</SelectItem>
                            <SelectItem value="kitchen">Kitchen</SelectItem>
                            <SelectItem value="staff">Staff</SelectItem>
                            <SelectItem value="driver">Driver</SelectItem>
                            <SelectItem value="reception">Reception</SelectItem>
                          </SelectContent>
                        </Select>
                        <CustomeEditField
                          id="phone"
                          name="phone"
                          label="Phone"
                          defaultValue={user.phone}
                          type="text"
                        />
                        {/* Add status field */}
                        <CustomeEditField
                          id="status"
                          name="status"
                          label="Status"
                          defaultValue={user.status || "Active"}
                          type="text"
                        />
                        <CustomEditGroupButtons type="submit" />
                      </FieldGroup>
                    </form>
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Users;
