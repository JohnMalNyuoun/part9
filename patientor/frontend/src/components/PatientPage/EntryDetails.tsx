import { Entry, HospitalEntry, OccupationalHealthcareEntry, HealthCheckEntry, HealthCheckRating } from "../../types";
import { Box, Typography } from "@mui/material";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import WorkIcon from "@mui/icons-material/Work";
import FavoriteIcon from "@mui/icons-material/Favorite";

const assertNever = (value: never): never => {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};

const HealthCheckEntryDetails = ({ entry }: { entry: HealthCheckEntry }) => {
  const getRatingColor = (rating: HealthCheckRating) => {
    switch (rating) {
      case HealthCheckRating.Healthy:
        return "green";
      case HealthCheckRating.LowRisk:
        return "yellow";
      case HealthCheckRating.HighRisk:
        return "orange";
      case HealthCheckRating.CriticalRisk:
        return "red";
      default:
        return "gray";
    }
  };

  return (
    <Box>
      <Typography variant="body1">
        {entry.date} <MedicalServicesIcon />
      </Typography>
      <Typography sx={{ fontStyle: "italic" }}>{entry.description}</Typography>
      <FavoriteIcon style={{ color: getRatingColor(entry.healthCheckRating) }} />
      <Typography variant="body2">diagnose by {entry.specialist}</Typography>
    </Box>
  );
};

const HospitalEntryDetails = ({ entry }: { entry: HospitalEntry }) => {
  return (
    <Box>
      <Typography variant="body1">
        {entry.date} <MedicalServicesIcon />
      </Typography>
      <Typography sx={{ fontStyle: "italic" }}>{entry.description}</Typography>
      {entry.discharge && (
        <Typography variant="body2">
          Discharge: {entry.discharge.date} — {entry.discharge.criteria}
        </Typography>
      )}
      <Typography variant="body2">diagnose by {entry.specialist}</Typography>
    </Box>
  );
};

const OccupationalHealthcareEntryDetails = ({ entry }: { entry: OccupationalHealthcareEntry }) => {
  return (
    <Box>
      <Typography variant="body1">
        {entry.date} <WorkIcon /> <strong>{entry.employerName}</strong>
      </Typography>
      <Typography sx={{ fontStyle: "italic" }}>{entry.description}</Typography>
      {entry.sickLeave && (
        <Typography variant="body2">
          Sick leave: {entry.sickLeave.startDate} to {entry.sickLeave.endDate}
        </Typography>
      )}
      <Typography variant="body2">diagnose by {entry.specialist}</Typography>
    </Box>
  );
};

const EntryDetails = ({ entry }: { entry: Entry }) => {
  switch (entry.type) {
    case "Hospital":
      return <HospitalEntryDetails entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcareEntryDetails entry={entry} />;
    case "HealthCheck":
      return <HealthCheckEntryDetails entry={entry} />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;