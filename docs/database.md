# データモデル設計ドキュメント

## 目次

1. [ユーザー管理モデル](#ユーザー管理モデル)
2. [学生管理モデル](#学生管理モデル)
3. [教育コンテンツモデル](#教育コンテンツモデル)
4. [スケジュール管理モデル](#スケジュール管理モデル)
5. [情報共有モデル](#情報共有モデル)
6. [列挙型](#列挙型)

## ユーザー管理モデル

### User

| フィールド名 | 型       | 属性              | 説明                              |
| ------------ | -------- | ----------------- | --------------------------------- |
| id           | String   | @id               | 主キー                            |
| displayName  | String?  | -                 | 表示名（オプション）              |
| pictureUrl   | String?  | -                 | プロフィール画像URL（オプション） |
| email        | String   | @unique           | メールアドレス（一意）            |
| role         | Role     | @default(DEFAULT) | ユーザー権限                      |
| studentName  | String?  | -                 | 学生名（オプション）              |
| studentId    | Int      | -                 | 学生ID（外部キー）                |
| isLinked     | Boolean  | @default(false)   | リンク状態                        |
| isAvailable  | Boolean  | @default(true)    | 利用可能状態                      |
| createdAt    | DateTime | @default(now())   | 作成日時                          |
| updatedAt    | DateTime | @updatedAt        | 更新日時                          |

### Teacher

| フィールド名 | 型       | 属性            | 説明               |
| ------------ | -------- | --------------- | ------------------ |
| name         | String   | @id             | 教師名（主キー）   |
| subject      | String   | -               | 担当科目           |
| userId       | String   | @unique         | ユーザーID（一意） |
| createdAt    | DateTime | @default(now()) | 作成日時           |
| updatedAt    | DateTime | @updatedAt      | 更新日時           |

## 学生管理モデル

### Student

| フィールド名   | 型       | 属性                          | 説明             |
| -------------- | -------- | ----------------------------- | ---------------- |
| id             | Int      | @id @default(autoincrement()) | 主キー           |
| uniqueId       | String   | @unique                       | 学生固有ID       |
| fullName       | String   | -                             | 氏名             |
| lastName       | String?  | -                             | 姓（オプション） |
| firstName      | String?  | -                             | 名（オプション） |
| enrollmentYear | Int      | -                             | 入学年度         |
| currentGrade   | Int      | -                             | 現在の学年       |
| currentClass   | String   | -                             | 現在のクラス     |
| currentNumber  | Int      | -                             | 現在の出席番号   |
| isActive       | Boolean  | @default(true)                | 在籍状態         |
| isLinked       | Boolean  | @default(false)               | リンク状態       |
| createdAt      | DateTime | @default(now())               | 作成日時         |
| updatedAt      | DateTime | @updatedAt                    | 更新日時         |

### StudentHistory

| フィールド名 | 型       | 属性                          | 説明               |
| ------------ | -------- | ----------------------------- | ------------------ |
| id           | Int      | @id @default(autoincrement()) | 主キー             |
| studentId    | Int      | -                             | 学生ID（外部キー） |
| academicYear | Int      | -                             | 学年度             |
| grade        | Int      | -                             | 学年               |
| className    | String   | -                             | クラス名           |
| number       | Int      | -                             | 出席番号           |
| createdAt    | DateTime | @default(now())               | 作成日時           |
| updatedAt    | DateTime | @updatedAt                    | 更新日時           |

## 教育コンテンツモデル

### Assignment（課題）

| フィールド名 | 型       | 属性                          | 説明               |
| ------------ | -------- | ----------------------------- | ------------------ |
| id           | Int      | @id @default(autoincrement()) | 主キー             |
| title        | String   | -                             | 課題タイトル       |
| subject      | String   | -                             | 教科               |
| dueDate      | DateTime | @db.Date                      | 提出期限           |
| academicYear | Int      | @default(2024)                | 学年度             |
| grade        | Int      | @default(2)                   | 学年               |
| className    | String   | @default("H")                 | クラス名           |
| isEvery      | Boolean  | @default(false)               | 全クラス共通フラグ |
| authorId     | String   | -                             | 作成者ID           |
| createdAt    | DateTime | @default(now())               | 作成日時           |
| updatedAt    | DateTime | @updatedAt                    | 更新日時           |

### Test（テスト）

| フィールド名       | 型       | 属性                          | 説明               |
| ------------------ | -------- | ----------------------------- | ------------------ |
| id                 | Int      | @id @default(autoincrement()) | 主キー             |
| name               | String   | -                             | テスト名           |
| subject            | String   | -                             | 教科               |
| implementationDate | DateTime | @db.Date                      | 実施日             |
| academicYear       | Int      | @default(2024)                | 学年度             |
| grade              | Int      | @default(2)                   | 学年               |
| className          | String   | @default("H")                 | クラス名           |
| isEvery            | Boolean  | @default(false)               | 全クラス共通フラグ |
| authorId           | String   | -                             | 作成者ID           |
| createdAt          | DateTime | @default(now())               | 作成日時           |
| updatedAt          | DateTime | @updatedAt                    | 更新日時           |

### Document（資料）

| フィールド名 | 型       | 属性                          | 説明         |
| ------------ | -------- | ----------------------------- | ------------ |
| id           | Int      | @id @default(autoincrement()) | 主キー       |
| title        | String   | -                             | 資料タイトル |
| description  | String   | -                             | 説明         |
| fileUrl      | String   | -                             | ファイルURL  |
| subject      | String   | -                             | 教科         |
| academicYear | Int      | @default(2024)                | 学年度       |
| grade        | Int      | @default(2)                   | 学年         |
| className    | String   | @default("H")                 | クラス名     |
| createdAt    | DateTime | @default(now())               | 作成日時     |
| updatedAt    | DateTime | @updatedAt                    | 更新日時     |

### Exam（試験）

| フィールド名 | 型       | 属性                          | 説明                   |
| ------------ | -------- | ----------------------------- | ---------------------- |
| id           | Int      | @id @default(autoincrement()) | 主キー                 |
| term         | String   | -                             | 学期                   |
| subject      | String   | -                             | 教科                   |
| scope        | String   | -                             | 範囲                   |
| exclusion    | String?  | -                             | 除外範囲（オプション） |
| academicYear | Int      | @default(2024)                | 学年度                 |
| grade        | Int      | @default(2)                   | 学年                   |
| authorId     | String   | -                             | 作成者ID               |
| createdAt    | DateTime | @default(now())               | 作成日時               |
| updatedAt    | DateTime | @updatedAt                    | 更新日時               |

## スケジュール管理モデル

### Change（変更）

| フィールド名 | 型       | 属性                          | 説明               |
| ------------ | -------- | ----------------------------- | ------------------ |
| id           | Int      | @id @default(autoincrement()) | 主キー             |
| date         | DateTime | @db.Date                      | 日付               |
| period       | Int      | -                             | 時限               |
| subject      | String   | -                             | 教科               |
| academicYear | Int      | @default(2024)                | 学年度             |
| grade        | Int      | @default(2)                   | 学年               |
| className    | String   | @default("H")                 | クラス名           |
| isEvery      | Boolean  | @default(false)               | 全クラス共通フラグ |
| authorId     | String   | -                             | 作成者ID           |
| createdAt    | DateTime | @default(now())               | 作成日時           |
| updatedAt    | DateTime | @updatedAt                    | 更新日時           |

### Schedule（スケジュール）

| フィールド名 | 型       | 属性                          | 説明               |
| ------------ | -------- | ----------------------------- | ------------------ |
| id           | Int      | @id @default(autoincrement()) | 主キー             |
| date         | DateTime | @db.Date                      | 日付               |
| academicYear | Int      | @default(2024)                | 学年度             |
| grade        | Int      | @default(2)                   | 学年               |
| className    | String   | @default("H")                 | クラス名           |
| content      | String   | -                             | 内容               |
| isEvery      | Boolean  | @default(false)               | 全クラス共通フラグ |
| authorId     | String   | -                             | 作成者ID           |
| createdAt    | DateTime | @default(now())               | 作成日時           |
| updatedAt    | DateTime | @updatedAt                    | 更新日時           |

### ScheduleWeek（週間スケジュール）

| フィールド名 | 型       | 属性                          | 説明     |
| ------------ | -------- | ----------------------------- | -------- |
| id           | Int      | @id @default(autoincrement()) | 主キー   |
| date         | DateTime | @db.Date                      | 日付     |
| week         | String   | -                             | 週       |
| authorId     | String   | -                             | 作成者ID |
| createdAt    | DateTime | @default(now())               | 作成日時 |
| updatedAt    | DateTime | @updatedAt                    | 更新日時 |

### ExamSchedule（試験スケジュール）

| フィールド名 | 型       | 属性                          | 説明       |
| ------------ | -------- | ----------------------------- | ---------- |
| id           | Int      | @id @default(autoincrement()) | 主キー     |
| academicYear | Int      | @default(2024)                | 学年度     |
| grade        | Int      | @default(2)                   | 学年       |
| date         | DateTime | @db.Date                      | 日付       |
| period       | String   | -                             | 時限       |
| timetable    | String[] | -                             | 時間割配列 |
| authorId     | String   | -                             | 作成者ID   |
| createdAt    | DateTime | @default(now())               | 作成日時   |
| updatedAt    | DateTime | @updatedAt                    | 更新日時   |

### Timetable（時間割）

| フィールド名 | 型       | 属性                          | 説明     |
| ------------ | -------- | ----------------------------- | -------- |
| id           | Int      | @id @default(autoincrement()) | 主キー   |
| week         | String   | -                             | 週       |
| day          | String   | -                             | 曜日     |
| academicYear | Int      | @default(2024)                | 学年度   |
| grade        | Int      | @default(2)                   | 学年     |
| className    | String   | @default("H")                 | クラス名 |
| first        | String   | -                             | 1時限目  |
| second       | String   | -                             | 2時限目  |
| third        | String   | -                             | 3時限目  |
| fourth       | String   | -                             | 4時限目  |
| fifth        | String   | -                             | 5時限目  |
| authorId     | String   | -                             | 作成者ID |
| createdAt    | DateTime | @default(now())               | 作成日時 |
| updatedAt    | DateTime | @updatedAt                    | 更新日時 |

## 情報共有モデル

### Information（情報）

| フィールド名 | 型       | 属性                          | 説明     |
| ------------ | -------- | ----------------------------- | -------- |
| id           | Int      | @id @default(autoincrement()) | 主キー   |
| date         | DateTime | @db.Date                      | 日付     |
| title        | String   | -                             | タイトル |
| content      | String   | -                             | 内容     |
| authorId     | String   | -                             | 作成者ID |
| createdAt    | DateTime | @default(now())               | 作成日時 |
| updatedAt    | DateTime | @updatedAt                    | 更新日時 |

### Post（投稿）

| フィールド名 | 型         | 属性                          | 説明                         |
| ------------ | ---------- | ----------------------------- | ---------------------------- |
| id           | Int        | @id @default(autoincrement()) | 主キー                       |
| content      | String     | -                             | 内容                         |
| mediaUrl     | String?    | -                             | メディアURL（オプション）    |
| mediaType    | mediaType? | -                             | メディアタイプ（オプション） |
| authorId     | String     | -                             | 作成者ID                     |

### Like（いいね）

| フィールド名 | 型       | 属性                          | 説明     |
| ------------ | -------- | ----------------------------- | -------- |
| id           | Int      | @id @default(autoincrement()) | 主キー   |
| authorId     | String   | -                             | 作成者ID |
| postId       | Int      | -                             | 投稿ID   |
| createdAt    | DateTime | @default(now())               | 作成日時 |

### View（閲覧）

| フィールド名 | 型       | 属性                          | 説明     |
| ------------ | -------- | ----------------------------- | -------- |
| id           | Int      | @id @default(autoincrement()) | 主キー   |
| authorId     | String   | -                             | 作成者ID |
| postId       | Int      | -                             | 投稿ID   |
| createdAt    | DateTime | @default(now())               | 作成日時 |

## 列挙型

### Role（権限）

| 値      | 説明         |
| ------- | ------------ |
| DEFAULT | 一般ユーザー |
| EDITOR  | 編集者       |
| ADMIN   | 管理者       |

### mediaType（メディアタイプ）

| 値       | 説明 |
| -------- | ---- |
| IMAGE    | 画像 |
| VIDEO    | 動画 |
| AUDIO    | 音声 |
| DOCUMENT | 文書 |
