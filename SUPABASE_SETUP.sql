-- ============================================================
-- 「我的自传」Supabase 数据库设置
-- Supabase后台 → SQL Editor → 粘贴执行
-- ============================================================

-- 1. 创建自传章节表
CREATE TABLE IF NOT EXISTS public.autobiographies (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title varchar(200) NOT NULL DEFAULT '无题',
  content text NOT NULL DEFAULT '',
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- 2. 启用行级安全策略 (RLS)
ALTER TABLE public.autobiographies ENABLE ROW LEVEL SECURITY;

-- 3. 先删除旧策略（如果存在）
DROP POLICY IF EXISTS "Users can CRUD own autobiographies" ON public.autobiographies;

-- 4. 创建安全策略：用户只能操作自己的数据
CREATE POLICY "Users can CRUD own autobiographies"
  ON public.autobiographies
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- 5. 验证
SELECT '✅ autobiographies 表创建成功！' AS status;
