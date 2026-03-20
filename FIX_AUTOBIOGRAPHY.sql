-- ============================================================
-- 「我的自传」数据库修复脚本
-- 运行方法：Supabase后台 → SQL Editor → 粘贴执行
-- ============================================================

-- Step 1: 删除旧表（如果存在，重新创建）
DROP TABLE IF EXISTS public.autobiographies CASCADE;

-- Step 2: 创建自传表
CREATE TABLE public.autobiographies (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title varchar(200) NOT NULL DEFAULT '无题',
  content text NOT NULL DEFAULT '',
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Step 3: 启用 RLS
ALTER TABLE public.autobiographies ENABLE ROW LEVEL SECURITY;

-- Step 4: 创建读写策略（允许已登录用户操作自己的数据）
DROP POLICY IF EXISTS "用户可插入自己的章节" ON public.autobiographies;
CREATE POLICY "用户可插入自己的章节"
  ON public.autobiographies FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "用户可读取自己的章节" ON public.autobiographies;
CREATE POLICY "用户可读取自己的章节"
  ON public.autobiographies FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "用户可更新自己的章节" ON public.autobiographies;
CREATE POLICY "用户可更新自己的章节"
  ON public.autobiographies FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "用户可删除自己的章节" ON public.autobiographies;
CREATE POLICY "用户可删除自己的章节"
  ON public.autobiographies FOR DELETE
  USING (auth.uid() = user_id);

-- Step 5: 给 anon 角色授权（Supabase JS Client 需要）
GRANT USAGE ON SCHEMA public TO anon;
GRANT ALL ON public.autobiographies TO anon;
GRANT ALL ON public.autobiographies TO authenticated;

-- Step 6: 验证
SELECT '✅ 数据库重建成功！' AS status;
