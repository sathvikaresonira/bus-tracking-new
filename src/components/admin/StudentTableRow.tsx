import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TableRow, TableCell } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreVertical, Edit, Trash2 } from "lucide-react";
import { Student } from "@/types";

interface StudentTableRowProps {
    student: Student;
    onView: (student: Student) => void;
    onEdit: (student: Student) => void;
    onDelete: (id: string) => void;
}

const StudentTableRow = ({ student, onView, onEdit, onDelete }: StudentTableRowProps) => {
    return (
        <TableRow>
            <TableCell className="font-medium">
                <button
                    onClick={() => onView(student)}
                    className="hover:underline text-left font-semibold text-primary"
                >
                    {student.name}
                </button>
            </TableCell>
            <TableCell>{student.class}</TableCell>
            <TableCell>
                <code className="text-xs bg-muted px-2 py-1 rounded">{student.rfid}</code>
            </TableCell>
            <TableCell>
                <div className="flex flex-col text-sm">
                    <span className="font-medium">{student.district || student.mandal || "N/A"}, {student.state || "N/A"}</span>
                    <span className="text-xs text-muted-foreground text-blue-500">{student.route}</span>
                </div>
            </TableCell>
            <TableCell>
                <div>
                    <p className="text-sm font-semibold">{student.parent}</p>
                    <p className="text-xs text-muted-foreground">{student.phone}</p>
                </div>
            </TableCell>
            <TableCell>
                <Badge className={
                    student.boardingStatus === "boarded"
                        ? "bg-green-100 text-green-800 hover:bg-green-200 border-green-200"
                        : "bg-red-100 text-red-800 hover:bg-red-200 border-red-200"
                }>
                    {student.boardingStatus === "boarded" ? "Boarded" : "Not Boarded"}
                </Badge>
            </TableCell>
            <TableCell>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <MoreVertical className="w-4 h-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem className="gap-2" onClick={() => onEdit(student)}>
                            <Edit className="w-4 h-4" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 text-destructive" onClick={() => onDelete(student.id)}>
                            <Trash2 className="w-4 h-4" /> Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </TableCell>
        </TableRow>
    );
};

export default StudentTableRow;
