'use strict';

const { Router } = require('express');
const validate = require('../middleware/validate');
const { requireAdmin } = require('../middleware/admin');
const { paperIdParams, createPaperBody, updatePaperBody } = require('../validators/mockPapers.schemas');
const service = require('../services/mockPapers.service');

/** Admin mock-paper management. Everything here requires an admin session. */
const router = Router();
router.use(requireAdmin);

router.get('/', async (_req, res) => {
  res.json({ success: true, data: await service.listAdminPapers() });
});

router.post('/', validate({ body: createPaperBody }), async (req, res) => {
  res.status(201).json({ success: true, data: await service.createPaper(req.valid.body, req.admin.id) });
});

router.get('/:paperId', validate({ params: paperIdParams }), async (req, res) => {
  res.json({ success: true, data: await service.getAdminPaper(req.valid.params.paperId) });
});

router.put('/:paperId', validate({ params: paperIdParams, body: updatePaperBody }), async (req, res) => {
  res.json({ success: true, data: await service.updatePaper(req.valid.params.paperId, req.valid.body) });
});

router.post('/:paperId/publish', validate({ params: paperIdParams }), async (req, res) => {
  res.json({ success: true, data: await service.publishPaper(req.valid.params.paperId) });
});

router.post('/:paperId/unpublish', validate({ params: paperIdParams }), async (req, res) => {
  res.json({ success: true, data: await service.unpublishPaper(req.valid.params.paperId) });
});

router.delete('/:paperId', validate({ params: paperIdParams }), async (req, res) => {
  res.json({ success: true, data: await service.deletePaper(req.valid.params.paperId) });
});

module.exports = router;
