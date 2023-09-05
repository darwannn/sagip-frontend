import moment from "moment";

export const formatDate = (dateString: string | null | undefined) => {
  if (!dateString) return "Unknown";

  const now = moment();
  const date = moment(dateString);

  if (now.diff(date, "minutes") < 60) {
    // Less than an hour ago
    return moment.duration(now.diff(date)).humanize() + " ago";
  } else if (now.diff(date, "hours") < 12) {
    // Less than 12 hours ago
    return date.format("h:mmA");
  } else if (now.diff(date, "hours") < 24) {
    // Less than 24 hours ago
    return "Yesterday at " + date.format("h:mmA");
  } else if (now.diff(date, "days") < 2) {
    // Less than 2 days ago
    return date.format("ddd [at] h:mmA");
  } else {
    // More than a week ago
    return date.format("MMM D [at] h:mmA");
  }
};
