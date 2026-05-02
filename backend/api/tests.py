from django.test import TestCase
from .models import Task


class TaskModelTests(TestCase):
    def test_create_task(self):
        task = Task.objects.create(title="Primera tarea")
        self.assertEqual(task.title, "Primera tarea")
        self.assertFalse(task.completed)
