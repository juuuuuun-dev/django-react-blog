resource "aws_kms_key" "rds_export_key" {
  description             = "RDS snapshot export key"
  deletion_window_in_days = 7
}
