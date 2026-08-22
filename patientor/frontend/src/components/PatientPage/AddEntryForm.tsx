import { useState, SyntheticEvent } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Alert,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  OutlinedInput,
  Chip,
  SelectChangeEvent,
} from "@mui/material";
import { EntryWithoutId, HealthCheckRating, Diagnosis } from "../../types";

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryWithoutId) => void;
  diagnoses: Diagnosis[];
  error?: string;
}

type EntryType = "HealthCheck" | "Hospital" | "OccupationalHealthcare";

const AddEntryForm = ({ onCancel, onSubmit, diagnoses, error }: Props) => {
  const [entryType, setEntryType] = useState<EntryType>("HealthCheck");

  // Base fields
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);

  // HealthCheck field
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(
    HealthCheckRating.Healthy
  );

  // Hospital fields
  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeCriteria, setDischargeCriteria] = useState("");

  // OccupationalHealthcare fields
  const [employerName, setEmployerName] = useState("");
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState("");
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState("");

  const handleDiagnosisCodesChange = (event: SelectChangeEvent<typeof diagnosisCodes>) => {
    const { target: { value } } = event;
    setDiagnosisCodes(typeof value === "string" ? value.split(",") : value);
  };

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();

    const baseValues = {
      description,
      date,
      specialist,
      diagnosisCodes,
    };

    switch (entryType) {
      case "HealthCheck":
        onSubmit({
          ...baseValues,
          type: "HealthCheck",
          healthCheckRating,
        });
        break;
      case "Hospital":
        onSubmit({
          ...baseValues,
          type: "Hospital",
          discharge: {
            date: dischargeDate,
            criteria: dischargeCriteria,
          },
        });
        break;
      case "OccupationalHealthcare":
        onSubmit({
          ...baseValues,
          type: "OccupationalHealthcare",
          employerName,
          sickLeave:
            sickLeaveStartDate && sickLeaveEndDate
              ? { startDate: sickLeaveStartDate, endDate: sickLeaveEndDate }
              : undefined,
        });
        break;
    }
  };

  return (
    <Box sx={{ border: "2px dashed gray", p: 2, mb: 2, borderRadius: 1 }}>
      <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
        New Entry
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <FormControl fullWidth margin="normal">
        <InputLabel>Entry Type</InputLabel>
        <Select
          value={entryType}
          label="Entry Type"
          onChange={({ target }) => setEntryType(target.value as EntryType)}
        >
          <MenuItem value="HealthCheck">Health Check</MenuItem>
          <MenuItem value="Hospital">Hospital</MenuItem>
          <MenuItem value="OccupationalHealthcare">Occupational Healthcare</MenuItem>
        </Select>
      </FormControl>

      <form onSubmit={addEntry}>
        <TextField
          label="Description"
          fullWidth
          value={description}
          onChange={({ target }) => setDescription(target.value)}
          margin="normal"
        />
        <TextField
          label="Date"
          type="date"
          fullWidth
          InputLabelProps={{ shrink: true }}
          value={date}
          onChange={({ target }) => setDate(target.value)}
          margin="normal"
        />
        <TextField
          label="Specialist"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
          margin="normal"
        />

        {/* Diagnosis Codes Multi-Select */}
        <FormControl fullWidth margin="normal">
          <InputLabel>Diagnosis Codes</InputLabel>
          <Select
            multiple
            value={diagnosisCodes}
            onChange={handleDiagnosisCodesChange}
            input={<OutlinedInput label="Diagnosis Codes" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
          >
            {diagnoses.map((d) => (
              <MenuItem key={d.code} value={d.code}>
                {d.code} - {d.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Dynamic Fields for HealthCheck */}
        {entryType === "HealthCheck" && (
          <FormControl fullWidth margin="normal">
            <InputLabel>Health Check Rating</InputLabel>
            <Select
              value={healthCheckRating}
              label="Health Check Rating"
              onChange={({ target }) => setHealthCheckRating(Number(target.value))}
            >
              <MenuItem value={HealthCheckRating.Healthy}>0 - Healthy</MenuItem>
              <MenuItem value={HealthCheckRating.LowRisk}>1 - Low Risk</MenuItem>
              <MenuItem value={HealthCheckRating.HighRisk}>2 - High Risk</MenuItem>
              <MenuItem value={HealthCheckRating.CriticalRisk}>3 - Critical Risk</MenuItem>
            </Select>
          </FormControl>
        )}

        {/* Dynamic Fields for Hospital */}
        {entryType === "Hospital" && (
          <Box sx={{ mt: 1 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
              Discharge Information
            </Typography>
            <TextField
              label="Discharge Date"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={dischargeDate}
              onChange={({ target }) => setDischargeDate(target.value)}
              margin="normal"
            />
            <TextField
              label="Discharge Criteria"
              fullWidth
              value={dischargeCriteria}
              onChange={({ target }) => setDischargeCriteria(target.value)}
              margin="normal"
            />
          </Box>
        )}

        {/* Dynamic Fields for OccupationalHealthcare */}
        {entryType === "OccupationalHealthcare" && (
          <Box sx={{ mt: 1 }}>
            <TextField
              label="Employer Name"
              fullWidth
              value={employerName}
              onChange={({ target }) => setEmployerName(target.value)}
              margin="normal"
            />
            <Typography variant="subtitle2" sx={{ fontWeight: "bold", mt: 1 }}>
              Sick Leave (Optional)
            </Typography>
            <TextField
              label="Start Date"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={sickLeaveStartDate}
              onChange={({ target }) => setSickLeaveStartDate(target.value)}
              margin="normal"
            />
            <TextField
              label="End Date"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={sickLeaveEndDate}
              onChange={({ target }) => setSickLeaveEndDate(target.value)}
              margin="normal"
            />
          </Box>
        )}

        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <Button color="secondary" variant="contained" type="button" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Add
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default AddEntryForm;