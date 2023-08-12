use sea_orm_migration::prelude::*;

#[derive(DeriveMigrationName)]
pub struct Migration;

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .create_table(
                Table::create()
                    .table(Receiver::Table)
                    .if_not_exists()
                    .col(
                        ColumnDef::new(Receiver::Id)
                            .integer()
                            .unsigned()
                            .not_null()
                            .auto_increment()
                            .primary_key(),
                    )
                    .col(ColumnDef::new(Receiver::Name).string().not_null())
                    .col(ColumnDef::new(Receiver::Address).string().not_null())
                    .col(
                        ColumnDef::new(Receiver::Network)
                            .big_integer()
                            .unsigned()
                            .not_null(),
                    )
                    .col(
                        ColumnDef::new(Receiver::Nonce)
                            .big_integer()
                            .unsigned()
                            .not_null(),
                    )
                    .col(
                        ColumnDef::new(Receiver::CreatedDate)
                            .timestamp()
                            .extra("DEFAULT CURRENT_TIMESTAMP".to_string())
                            .not_null(),
                    )
                    .index(
                        Index::create()
                            .name("index_name")
                            .unique()
                            .col(Receiver::Name),
                    )
                    .to_owned(),
            )
            .await
    }

    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .drop_table(Table::drop().table(Receiver::Table).to_owned())
            .await
    }
}

/// Learn more at https://docs.rs/sea-query#iden
#[derive(Iden)]
pub enum Receiver {
    Table,
    Id,
    Name,
    Address,
    Network,
    Nonce,
    CreatedDate,
}
