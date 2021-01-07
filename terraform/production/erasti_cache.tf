
# redis parameter group
# resource "aws_elasticache_parameter_group" "default" {
#   name   = "${var.app_name}-${var.environment}-parameter_group"
#   family = "memcached1.6"
# }
# resource "aws_elasticache_subnet_group" "defautl" {
#   name       = "${var.app_name}-${var.environment}-subnet"
#   subnet_ids = module.vpc.private_subnets
# }

resource "aws_elasticache_cluster" "default" {
  cluster_id           = "${var.app_name}-${var.environment}-cluster"
  engine               = "memcached"
  node_type            = "cache.t2.micro"
  num_cache_nodes      = 1
  parameter_group_name = "default.memcached1.6"
  port                 = 11211
}

# # replication group
# resource "aws_elasticache_replication_group" "example" {
#   replication_group_id          = "example"
#   replication_group_description = "Cluster disabled"
#   engine                        = "redis"
#   engine_version                = "5.0.4"
#   number_cache_clusters         = 2                     # ノード数
#   node_type                     = "cache.t2.micro"      # 無料枠 グレードが高いほどapplyも早い
#   snapshot_window               = "09:40-10:40"         # UTC
#   snapshot_retention_limit      = 7                     # 保存日数
#   maintenance_window            = "mon:10:45-mon:11:45" # 週一メンテ UTC
#   automatic_failover_enabled    = true                  # Mult azが有効な場合は
#   port                          = 6379                  # redis default port
#   apply_immediately             = false                 # 設定即時反映するか
#   security_group_ids            = [module.redis_sg.security_group_id]
#   parameter_group_name          = aws_elasticache_parameter_group.example.name
#   subnet_group_name             = aws_elasticache_subnet_group.example.name
# }

# module "redis_sg" {
#   source      = "./security_group"
#   name        = "dedis-sg"
#   vpc_id      = aws_vpc.example.id
#   port        = 6379
#   cidr_blocks = [aws_vpc.example.cidr_block]
# }
