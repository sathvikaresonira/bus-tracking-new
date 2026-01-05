import { useState } from "react";
import { Search, Plus, Filter, MoreVertical, Edit, Trash2, User, Shield, CreditCard, Phone, MapPin, Calendar, BookOpen, GraduationCap, Home, Heart, X, Bus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Student } from "@/types";
import { useData } from "@/context/DataContext";
import { toast } from "sonner";
import { Autocomplete } from "@/components/ui/autocomplete";
import { mockCountries, mockStates, mockDistricts } from "@/data/locations";

// Extracted Components
import StudentDetailsDialog from "@/components/admin/StudentDetailsDialog";
import StudentTableRow from "@/components/admin/StudentTableRow";

export default function Students() {
  const { students, buses, addStudent, deleteStudent, updateStudent, restoreStudent, searchQuery: globalSearchQuery } = useData();
  const [localSearchQuery, setLocalSearchQuery] = useState("");
  const searchQuery = globalSearchQuery || localSearchQuery;

  const [classFilter, setClassFilter] = useState("all");
  const [routeFilter, setRouteFilter] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [isViewStudentOpen, setIsViewStudentOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  // Form State
  const [newStudent, setNewStudent] = useState({
    name: "",
    class: "",
    rfid: "",
    route: "",
    parent: "",
    phone: "",
    guardianName: "",
    guardianPhone: "",
    state: "",
    district: "",
    country: "",
    status: "active" as "active" | "inactive",
    bloodGroup: "",
    dob: "",
    address: "",
    rollNumber: "",
    assignedBus: "",
    emergencyContact: "",
  });

  const handleAddStudent = () => {
    if (!newStudent.name || !newStudent.rfid) {
      toast.error("Name and RFID are required");
      return;
    }

    if (editingId) {
      updateStudent(editingId, newStudent);
      toast.success("Student updated successfully");
    } else {
      const newId = addStudent(newStudent);
      toast("Message sent", {
        description: "Student added successfully",
        action: {
          label: "Undo",
          onClick: () => {
            deleteStudent(newId);
            toast.info("Action undone");
          }
        },
      });
    }

    setIsAddDialogOpen(false);
    setEditingId(null);
    setNewStudent({
      name: "", class: "", rfid: "", route: "", parent: "", phone: "",
      guardianName: "", guardianPhone: "", state: "", district: "",
      country: "", status: "active", bloodGroup: "", dob: "",
      address: "", rollNumber: "", assignedBus: "", emergencyContact: "",
    });
  };

  const handleDeleteStudent = (id: string) => {
    const studentToDelete = students.find(s => s.id === id);
    deleteStudent(id);
    toast.success("Student deleted", {
      action: {
        label: "Undo",
        onClick: () => studentToDelete && restoreStudent(studentToDelete),
      },
    });
  };

  const openEditDialog = (student: Student) => {
    setEditingId(student.id);
    setNewStudent({
      name: student.name,
      class: student.class,
      rfid: student.rfid,
      route: student.route,
      parent: student.parent,
      phone: student.phone,
      guardianName: student.guardianName || "",
      guardianPhone: student.guardianPhone || "",
      state: student.state || "",
      district: student.district || "",
      country: student.country || "",
      status: student.status,
      bloodGroup: student.bloodGroup || "",
      dob: student.dob || "",
      address: student.address || "",
      rollNumber: student.rollNumber || "",
      assignedBus: student.assignedBus || "",
      emergencyContact: student.emergencyContact || "",
    });
    setIsAddDialogOpen(true);
  };

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.rfid.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.parent.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesClass = classFilter === "all" || student.class === classFilter;
    const matchesRoute = routeFilter === "all" || student.route === routeFilter;

    return matchesSearch && matchesClass && matchesRoute;
  });

  const classes = Array.from(new Set(students.map(s => s.class))).sort();
  const routes = Array.from(new Set(students.map(s => s.route))).sort();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Students</h1>
          <p className="text-muted-foreground">Manage student RFID cards and routing</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2" onClick={() => {
              setEditingId(null);
              setNewStudent({
                name: "", class: "", rfid: "", route: "", parent: "", phone: "",
                guardianName: "", guardianPhone: "", state: "", district: "",
                country: "", status: "active", bloodGroup: "", dob: "",
                address: "", rollNumber: "", assignedBus: "", emergencyContact: "",
              });
              setIsAddDialogOpen(true);
            }}>
              <Plus className="w-4 h-4" /> Add Student
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingId ? "Edit Student" : "Add New Student"}</DialogTitle>
              <DialogDescription>
                {editingId ? "Update student details." : "Enter student information to register a new RFID card."}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="John Doe" value={newStudent.name} onChange={e => setNewStudent({ ...newStudent, name: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rfid">RFID Number</Label>
                  <Input id="rfid" placeholder="RF882299" value={newStudent.rfid} onChange={e => setNewStudent({ ...newStudent, rfid: e.target.value })} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="class">Class / Section</Label>
                  <Select value={newStudent.class} onValueChange={val => setNewStudent({ ...newStudent, class: val })}>
                    <SelectTrigger><SelectValue placeholder="Select class" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Class 1">Class 1</SelectItem>
                      <SelectItem value="Class 2">Class 2</SelectItem>
                      <SelectItem value="Class 3">Class 3</SelectItem>
                      <SelectItem value="Class 4">Class 4</SelectItem>
                      <SelectItem value="Class 5">Class 5</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="route">Route Assignment</Label>
                  <Select value={newStudent.route} onValueChange={val => setNewStudent({ ...newStudent, route: val })}>
                    <SelectTrigger><SelectValue placeholder="Select route" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Route A">Route A</SelectItem>
                      <SelectItem value="Route B">Route B</SelectItem>
                      <SelectItem value="Route C">Route C</SelectItem>
                      <SelectItem value="Route D">Route D</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="parent">Parent Name</Label>
                  <Input id="parent" placeholder="Robert Doe" value={newStudent.parent} onChange={e => setNewStudent({ ...newStudent, parent: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Parent Phone</Label>
                  <Input id="phone" placeholder="+91 98765 43210" value={newStudent.phone} onChange={e => setNewStudent({ ...newStudent, phone: e.target.value })} />
                </div>
              </div>

              {/* Autocomplete fields for location */}
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Country</Label>
                  <Autocomplete
                    options={mockCountries}
                    value={newStudent.country}
                    onChange={val => setNewStudent({ ...newStudent, country: val })}
                    placeholder="India"
                  />
                </div>
                <div className="space-y-2">
                  <Label>State</Label>
                  <Autocomplete
                    options={mockStates}
                    value={newStudent.state}
                    onChange={val => setNewStudent({ ...newStudent, state: val })}
                    placeholder="Telangana"
                  />
                </div>
                <div className="space-y-2">
                  <Label>District</Label>
                  <Autocomplete
                    options={mockDistricts}
                    value={newStudent.district}
                    onChange={val => setNewStudent({ ...newStudent, district: val })}
                    placeholder="Hyderabad"
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleAddStudent}>{editingId ? "Update Student" : "Register Student"}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search students, RFID, or parents..."
            className="pl-10"
            value={localSearchQuery}
            onChange={(e) => setLocalSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Select value={classFilter} onValueChange={setClassFilter}>
            <SelectTrigger className="w-[140px]">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4" />
                <span>{classFilter === "all" ? "All Classes" : classFilter}</span>
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Classes</SelectItem>
              {classes.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={routeFilter} onValueChange={setRouteFilter}>
            <SelectTrigger className="w-[140px]">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{routeFilter === "all" ? "All Routes" : routeFilter}</span>
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Routes</SelectItem>
              {routes.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </div>

      <StudentDetailsDialog
        student={selectedStudent}
        isOpen={isViewStudentOpen}
        onClose={() => setIsViewStudentOpen(false)}
        buses={buses}
      />

      {/* Students Table */}
      <Card className="animate-fade-in">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Students ({filteredStudents.length})</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Class</TableHead>
                <TableHead>RFID</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Parent</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    No students found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredStudents.map((student) => (
                  <StudentTableRow
                    key={student.id}
                    student={student}
                    onView={(s) => {
                      setSelectedStudent(s);
                      setIsViewStudentOpen(true);
                    }}
                    onEdit={openEditDialog}
                    onDelete={handleDeleteStudent}
                  />
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
