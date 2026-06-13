-- 1. Profiles: remove overly broad discoverable SELECT policy
DROP POLICY IF EXISTS "Authenticated users can view discoverable profiles" ON public.profiles;

-- 2. Storage: plan-photos — restrict SELECT to plan participants / owner / uploader
DROP POLICY IF EXISTS "Authenticated users can view plan photos" ON storage.objects;

CREATE POLICY "Plan participants can view plan photos"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'plan-photos'
  AND (
    -- Uploader of the storage object (folder-name convention)
    (auth.uid())::text = (storage.foldername(name))[1]
    OR EXISTS (
      SELECT 1
      FROM public.plan_photos pp
      WHERE pp.file_path = storage.objects.name
        AND (
          pp.uploaded_by = auth.uid()
          OR EXISTS (
            SELECT 1 FROM public.plans p
            WHERE p.id = pp.plan_id AND p.user_id = auth.uid()
          )
          OR EXISTS (
            SELECT 1 FROM public.plan_participants pa
            WHERE pa.plan_id = pp.plan_id AND pa.friend_id = auth.uid()
          )
        )
    )
  )
);

-- 3. Storage: chat-images — restrict SELECT to uploader (chat feature retired)
DROP POLICY IF EXISTS "Authenticated users can view chat images" ON storage.objects;

CREATE POLICY "Users can view their own chat images"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'chat-images'
  AND (auth.uid())::text = (storage.foldername(name))[1]
);

-- 4. Storage: vibe-media — restrict SELECT to uploader (vibe-send feature retired)
DROP POLICY IF EXISTS "Authenticated users can view vibe media" ON storage.objects;

CREATE POLICY "Users can view their own vibe media"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'vibe-media'
  AND (auth.uid())::text = (storage.foldername(name))[1]
);

-- 5. trip_proposal_invites: explicit UPDATE policy restricting accepted_by to self
CREATE POLICY "Invitees can accept their own invite"
ON public.trip_proposal_invites
FOR UPDATE
TO authenticated
USING (accepted_by IS NULL OR accepted_by = auth.uid())
WITH CHECK (accepted_by = auth.uid());